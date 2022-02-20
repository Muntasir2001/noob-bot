const { array } = require('./utils');
const { MAX_MESSAGES_FETCH, BULK_MESSAGES_LIMIT } = require('./constants');

const getMessagesInRange = async (channel, start, end) => {
	try {
		if (start.createdTimestamp > end.createdTimestamp) {
			const temp = start;
			start = end;
			end = temp;
		}

		let stoppedEarly = true;
		const msgs = [start];
		while (msgs.length < MAX_MESSAGES_FETCH) {
			const fetchedMsgs = Array.from(
				(
					await channel.messages.fetch({
						// cannot also provide the "before: end.id" option since multiple options are not supported by the API
						after: start.id,
						limit: BULK_MESSAGES_LIMIT,
					})
				).values(),
			).reverse(); // reverse so the messages are ordered chronologically

			const indexOfEndMsg = fetchedMsgs.findIndex(
				(msg) => msg.id === end.id,
			);

			if (indexOfEndMsg === -1) {
				// haven't reached the end message yet, so add messages and keep fetching for more
				msgs.push(...fetchedMsgs);
				start = fetchedMsgs[fetchedMsgs.length - 1];
			} else {
				// found the end message, so add messages (ignoring ones after end message) and stop fetching
				msgs.push(...fetchedMsgs.slice(0, indexOfEndMsg + 1));
				stoppedEarly = false;
				break;
			}
		}
		return [msgs, stoppedEarly];
	} catch (error) {
		console.log(error);
	}
};

const findMessageInGuild = async (messageId, guild, startingChannel) => {
	try {
		if (startingChannel) {
			try {
				const foundMsg = await startingChannel.messages.fetch(messageId);
				return [foundMsg, startingChannel];
			} catch (err) {
				// Do nothing
			}
		}
		// TODO: Search threads as well
		// console.log(await guild.channels.fetch());
		const channels = Array.from((await guild.channels.fetch()).values());
		for (let i = 0; i < channels.length; i++) {
			const channel = channels[i];

			if (!channel.isText() || channel === startingChannel) continue;

			try {
				const foundMsg = await channel.messages.fetch(messageId);
				return [foundMsg, channel];
			} catch (err) {
				// Do nothing
			}
		}

		return [];
	} catch (error) {
		console.log(error);
	}
};

const getInfoFromCommandInteraction = async (interaction, options = {}) => {
	try {
		// DOUBT: haven't understood bottom two lines
		const { ephemeral = false } = options;
		const interactionMsg = !ephemeral ? await interaction.fetchReply() : null;

		// Guild
		if (interaction.inGuild()) {
			const channel = await interaction.guild.channels.fetch(
				interaction.channelId,
			);
			if (!channel || !channel.isText()) {
				return {
					message: null,
					channel: null,
					author: null,
				};
			}
			const message = interactionMsg
				? await channel.messages.fetch(interactionMsg.id)
				: null;
			const member = await interaction.guild.members.fetch(
				interaction.user.id,
			);
			const author = member.user;

			return {
				channel,
				message,
				author,
			};
		}

		// DM
		const channel = await client.channels.fetch(interaction.channelId);
		const author = interaction.user;
		const message = interactionMsg
			? await channel.messages.fetch(interactionMsg.id)
			: null;
		return {
			channel,
			message,
			author,
		};
	} catch (error) {
		console.log(error);
	}
};

const usersHavePermission = (channel, userOrUsers, permission) => {
	const users = array(userOrUsers);
	// DOUBT: no clue what is this if statement for
	if (!('permissionsFor' in channel)) return true;

	return users.every((user) =>
		Boolean(channel.permissionsFor(user)?.has(permission)),
	);
};

module.exports = {
	getMessagesInRange,
	findMessageInGuild,
	getInfoFromCommandInteraction,
	usersHavePermission,
};

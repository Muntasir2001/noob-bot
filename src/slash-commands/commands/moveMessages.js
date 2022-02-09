const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const {
	getMessagesInRange,
	findMessageInGuild,
	getInfoFromCommandInteraction,
} = require('../../discord-utils');
const { filterOutFalsy } = require('../../utils');

const moveMessage = async (channel, message, replyTo) => {
	await channel.sendTyping();

	const newMessageEmbed = new MessageEmbed({
		author: {
			name: message.author.username,
			icon_url: message.author.avatarURL() || undefined,
		},
		description: message.content,
	});

	const newMessageArgs = {
		embeds: [newMessageEmbed].concat(message.embeds),
		files: Array.from(message.attachments.values()),
	};

	const newMessage = await (replyTo
		? replyTo.reply(newMessageArgs)
		: channel.send(newMessageArgs));
	await message.delete();

	return newMessage;
};

const moveMessages = async (interaction, CMD_NAME, options, client) => {
	const channelId = options.getChannel('to_channel').id;
	const startId = options.getString('start_message_id');
	const endId = options.getString('end_message_id');

	console.log('to channel ID: ', channelId);

	const toChannel = await interaction.guild.channels.fetch(channelId);
	if (!toChannel || !toChannel.isText()) {
		interaction.reply(`Could not resolve toChannel: <#${channelId}>`);
		return null;
	}

	const [startMsg, fromChannel] = await findMessageInGuild(
		startId,
		interaction.guild,
		interaction.channel,
	);

	if (!startMsg || !fromChannel) {
		await interaction.reply('Could not find starting message.');
		return null;
	}

	if (toChannel.id === fromChannel.id) {
		await interaction.reply("You're moving messages to the same channel??");
		return null;
	}

	const { author } = await getInfoFromCommandInteraction(interaction, {
		ephemeral: true,
	});

	if (!author) {
		await interaction.reply('Could not find who is invoking this command.');
		return null;
	}

	const authorAndBot = filterOutFalsy([author, client.user]);

	// TODO: permission, need to fix
	// if (
	//    !usersHavePermission(toChannel, authorAndBot, [
	//       'SEND_MESSAGES',
	//       'VIEW_CHANNEL',
	//    ])
	// ) {
	//    await interaction.editReply(
	//       `One of us not have access to send messages in <#${toChannel.id}>`
	//    );
	//    return null;
	// }

	// if (
	//    !usersHavePermission(fromChannel, authorAndBot, [
	//       'MANAGE_MESSAGES',
	//       'VIEW_CHANNEL',
	//    ])
	// ) {
	//    await interaction.editReply(
	//       `One of us not have access to delete messages in <#${fromChannel.id}>`
	//    );
	//    return null;
	// }

	// single message; not a range
	if (!endId) {
		await toChannel.sendTyping();
		await toChannel.send(`__Messages moved from__ <#${fromChannel.id}>`);
		await moveMessage(toChannel, startMsg);
		await interaction.reply({ content: '1 message moved.' });
		// return null;
	}

	// for more than one message

	// let endMsg;

	// try {
	//    endMsg = await fromChannel.messages.fetch(endId);
	// } catch (err) {
	//    await interaction.editReply(
	//       'End message is not in the same channel as start message.'
	//    );
	//    return null;
	// }

	// const [msgs, stoppedEarly] = await getMessagesInRange(
	//    fromChannel,
	//    startMsg,
	//    endMsg
	// );

	// const confirmPrompt = `Are you sure you want to move ${
	//    msgs.length
	// } messages to <#${toChannel.id}>?${
	//    stoppedEarly
	//       ? '\nNote: Some messages in the range were not included due to a rate limit precaution.'
	//       : ''
	// }`;

	// const workingMessage = `Moving ${msgs.length} messages to <#${toChannel.id}>...`;

	// const res = {
	//    intermediateResult: { msgs, toChannel, fromChannel },
	//    confirmPrompt,
	//    workingMessage,
	// };

	// return res;
};

module.exports = moveMessages;

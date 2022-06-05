const {
	Message,
	Permissions,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

const roleIDs = require('../../../configs/roleIDs');
const getReason = require('../../../globalUtils/getReason');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const warn = async (message, CMD_NAME, args, client) => {
	if (!message.member.permissions.has('KICK_MEMBERS'))
		return message.reply({
			embeds: [
				infoMessageEmbed(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				),
			],
		});

	if (CMD_NAME === 'warn') {
		if (!args[0]) {
			return message.reply({
				embeds: [
					infoMessageEmbed('Please provide an user ID or tag an User'),
				],
			});
		}

		if (!args[1]) {
			return message.reply({
				embeds: [infoMessageEmbed('Please provide a message/reason')],
			});
		}

		const guildId = process.env.GUILD_ID;
		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(message.guild.id);

		let member;
		let user;
		let isWarnable = true;

		if (message.mentions.members.first()) {
			member = message.mentions.members.first();
			user = member.user;
		} else {
			member = await client.users.fetch(args[0]).catch((err) => {
				message.channel.send(`${args[0]} is an unknown user`);
			});

			user = await member;
		}

		// see if member exists
		if (!member) {
			isWarnable = false;
		}

		if (isWarnable) {
			let warningChannelId;
			let warningChannel;

			let warnGuild = guild.channels.create(`Warning-${user.tag}`, {
				type: 'GUILD_TEXT',
				topic: `Warning to ${member.id}`,
				reason: `<@${message.author.id}> has warned <@${member.id}>`,
				permissionOverwrites: [
					{
						id: guild.roles.everyone,
						deny: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: await guild.roles.fetch(roleIDs.modRole),
						allow: [
							Permissions.FLAGS.VIEW_CHANNEL,
							Permissions.FLAGS.SEND_MESSAGES,
							Permissions.FLAGS.ATTACH_FILES,
							Permissions.FLAGS.EMBED_LINKS,
							Permissions.FLAGS.READ_MESSAGE_HISTORY,
						],
					},
					{
						id: member.id,
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
						deny: [Permissions.FLAGS.SEND_MESSAGES],
					},
				],
			});

			await warnGuild.then((data) => {
				warningChannel = data;
				warningChannelId = data.id;
			});

			// BUG: if u do this, then the original "args" changes as well and removes the first element of the args which is the user id, IDK WHYYYY ***
			const reason = getReason(args);

			const warnRequest = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: Warned ${user.tag}`)
				.addField('Moderator', `<@${message.author.id}>`)
				.addField('Reason', `${reason}`)
				.addField('Warning channel', `<#${warningChannelId}>`)
				.setTimestamp()
				.setFooter({ text: `Member ID: ${member.id}` });

			const warningMessage = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: You have received a warning`)
				.addField('Reason', `${reason}`)
				.setTimestamp()
				.setFooter({ text: `Reach out to mods if you have any question` });

			message.channel.send({ embeds: [warnRequest] });

			const close = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('close_current_channel')
					.setLabel('Close channel')
					.setStyle('DANGER'),
			);

			warningChannel.send({
				content: `<@${member.id}>`,
				embeds: [warningMessage],
				components: [close],
			});

			client.on('interactionCreate', async (interaction) => {
				if (!interaction.isButton()) return;

				const channel = await guild.channels.resolve(
					interaction.message.channelId,
				);

				await channel.delete();
				// .then((data) => console.log(data))
				// .catch((err) => console.error(err));
			});
		}
	}
};

module.exports = warn;

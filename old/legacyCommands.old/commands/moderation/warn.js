const fs = require('fs');

const {
	Permissions,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

const roleIDs = require('../../../TEST_ROLE_IDS/roleIDs.json');
const getReason = require('../../../globalUtils/getReason');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const warn = async (message, CMD_NAME, args, client) => {
	try {
		if (
			!message.member.permissions.has('KICK_MEMBERS') &&
			!message.member.roles.cache.some(
				(role) => role.id === roleIDs.MOD_ROLE,
			)
		) {
			return await interaction.reply({
				embeds: [
					infoMessageEmbed(
						':warning: You are not allowed to use this button!',
						'WARNING',
					),
				],
			});
		}

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

		let user;

		if (message.mentions.members.first()) {
			user = message.mentions.members.first().user;
		} else {
			await client.users
				.fetch(args[0])
				.then((data) => {
					user = data;
				})
				.catch((err) => {
					return message.reply(`${args[0]} is an unknown user`);
				});
		}

		if (user) {
			let warningChannelId;
			let warningChannel;

			const warnGuild = guild.channels.create(`Warning-${user.tag}`, {
				type: 'GUILD_TEXT',
				topic: `Warning to ${user.id}`,
				reason: `<@${message.author.id}> has warned <@${user.id}>`,
				permissionOverwrites: [
					{
						id: guild.roles.everyone,
						deny: [Permissions.FLAGS.VIEW_CHANNEL],
					},
					{
						id: await guild.roles.fetch(roleIDs.MOD_ROLE),
						allow: [
							Permissions.FLAGS.VIEW_CHANNEL,
							Permissions.FLAGS.SEND_MESSAGES,
							Permissions.FLAGS.ATTACH_FILES,
							Permissions.FLAGS.EMBED_LINKS,
							Permissions.FLAGS.READ_MESSAGE_HISTORY,
						],
					},
					{
						id: user.id,
						allow: [Permissions.FLAGS.VIEW_CHANNEL],
						deny: [Permissions.FLAGS.SEND_MESSAGES],
					},
				],
			});

			await warnGuild.then((data) => {
				warningChannel = data;
				warningChannelId = data.id;
			});

			// BUG: if u do this, then the original "args" changes as well and removes the first element of the args which is the user id, IDK WHYYYY. EDIT: IK why, args/objects are mutable in JS :)***
			const reason = getReason(args);

			const warnRequest = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: Warned ${user.tag}`)
				.addField('Moderator', `<@${message.author.id}>`)
				.addField('Reason', `${reason}`)
				.addField('Warning channel', `<#${warningChannelId}>`)
				.setTimestamp()
				.setFooter({ text: `Member ID: ${user.id}` });

			const warningMessage = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: You have received a warning`)
				.addField('Reason', `${reason}`)
				.setTimestamp()
				.setFooter({
					text: `Reach out to mods if you have any question`,
				});

			message.channel.send({ embeds: [warnRequest] });

			const button = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('closeWarnChannel')
					.setLabel('Close channel')
					.setStyle('DANGER'),
			);

			warningChannel.send({
				content: `<@${user.id}>`,
				embeds: [warningMessage],
				components: [button],
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/warn.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);

			return false;
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = warn;

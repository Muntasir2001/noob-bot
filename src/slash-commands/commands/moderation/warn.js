const fs = require('fs');

const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Permissions,
} = require('discord.js');

const getMember = require('../../utilities/getMember');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');
const roleIDs = require('../../../TEST_ROLE_IDS/roleIDs');

const warn = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user', true);
		const reason = options.getString('reason');

		if (
			!interaction.memberPermissions.has('KICK_MEMBERS') &&
			!interaction.member.roles.cache.some(
				(role) => role.id === roleIDs.modRole,
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

		const guildId = process.env.GUILD_ID;
		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(interaction.guild.id);

		let warningChannelId;
		let warningChannel;

		const warnGuild = guild.channels.create(`Warning-${user.tag}`, {
			type: 'GUILD_TEXT',
			topic: `Warning to ${user}`,
			reason: `${interaction.member.user} has warned ${user}`,
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

		const warnRequest = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`:warning: Warned ${user.tag}`)
			.addField('Moderator', `${interaction.member.user}`)
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

		await interaction.reply({
			embeds: [warnRequest],
		});

		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('closeWarnChannel')
				.setLabel('Close channel')
				.setStyle('DANGER'),
		);

		await warningChannel.send({
			content: `<@${user.id}>`,
			embeds: [warningMessage],
			components: [button],
		});
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/warn.js \n Actual error: ${err} \n \n`,
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

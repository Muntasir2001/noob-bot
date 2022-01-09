const { Message, Permissions, MessageEmbed } = require('discord.js');
const { modRole } = require('../../configs/roleIDs');
const roleIDs = require('../../configs/roleIDs');

const warn = async (message, CMD_NAME, args, client) => {
	/**
	 * @param {Message} message
	 */

	if (!message.member.permissions.has('KICK_MEMBERS'))
		return message.reply(
			'HEY HEY HEY there, I see what you trynna do there :eyes:',
		);

	if (CMD_NAME === 'warn') {
		const guildId = process.env.GUILD_ID;
		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(message.guild.id);

		let member;
		let user;

		let isWarnable = true;

		if (!args[0]) {
			return message.reply('Please provide an user ID');
		}

		if (!args[1]) {
			return message.reply('Please provide a message');
		}

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

			const warnRequest = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: Warned ${user.tag}`)
				.addField('Moderator', `<@${message.author.id}>`)
				.addField('Message', `${args[1]}`)
				.addField('Warning channel', `<#${warningChannelId}>`)
				.setTimestamp()
				.setFooter(`${member.id}`);

			const warningMessage = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: You have received a warning`)
				.addField('Message', `${args[1]}`)
				.setTimestamp()
				.setFooter(`Reach out to mods if you have any questions`);

			message.channel.send({ embeds: [warnRequest] });

			warningChannel.send({
				content: `<@${member.id}>`,
				embeds: [warningMessage],
			});
		}
	}
};

module.exports = warn;

const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const getClientMember = require('../../../globalUtils/getClientMember');
const getReason = require('../../../globalUtils/getReason');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const ban = async (message, CMD_NAME, args, client) => {
	try {
		if (CMD_NAME === 'ban') {
			if (!message.member.permissions.has('BAN_MEMBERS'))
				return message.reply({
					embeds: [
						infoMessageEmbed(
							'HEY HEY HEY there, I see what you trynna do there :eyes:',
						),
					],
				});

			if (!args[0]) {
				return message.reply({
					embeds: [
						infoMessageEmbed('Please provide an user ID or tag an User'),
					],
				});
			}

			if (!args[1]) {
				return message.reply({
					embeds: [infoMessageEmbed('Please provide a reason')],
				});
			}

			let member;

			if (message.mentions.members.first()) {
				member = await getClientMember({
					user: message.mentions.members.first().id,
					client: client,
					message: message,
				});
			} else {
				member = await getClientMember({
					client: client,
					user: args[0],
					message: message,
				});
			}

			const reason = getReason(args);

			await message.guild.members
				.ban(member.id, { days: 0, reason: reason })
				.then((data) => {
					const banEmbed = new MessageEmbed()
						.setColor('#FF4454')
						.setTitle(`:no_entry: Banned ${member.tag}`)
						.addFields(
							{
								name: 'Moderator',
								value: `<@${message.author.id}>`,
							},
							{
								name: 'Banned user',
								value: `<@${member.id}>`,
							},
							{
								name: 'Reason',
								value: reason,
							},
						)
						.setTimestamp()
						.setFooter({ text: `Member ID: ${member.id}` });

					message.channel.send({ embeds: [banEmbed] });
				})
				.catch((err) => {
					console.log(err);

					message.reply({
						embeds: [
							infoMessageEmbed(
								`:x: Couldn't ban ${member.tag}`,
								'ERROR',
							),
						],
					});
				});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/ban.js \n Actual error: ${err} \n \n`,
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

module.exports = ban;

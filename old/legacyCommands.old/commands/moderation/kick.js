const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const getReason = require('../../../globalUtils/getReason');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');
const getMember = require('../../utilities/getMember');

const kick = async (message, CMD_NAME, args, client) => {
	try {
		if (!message.member.permissions.has('KICK_MEMBERS')) {
			return message.reply({
				embeds: [
					infoMessageEmbed(
						'HEY HEY HEY there, I see what you trynna do there :eyes:',
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
				embeds: [infoMessageEmbed('Please provide a reason')],
			});
		}

		let member;

		if (message.mentions.members.first()) {
			member = message.mentions.members.first();
		} else {
			member = await getMember(client, args[0], message, false);
		}

		const reason = getReason(args);

		await member
			.kick(reason)
			.then((data) => {
				const kickEmbed = new MessageEmbed()
					.setColor('#FF4454')
					.setTitle(`:stop_sign: Kicked ${member.user.tag}`)
					.addFields(
						{
							name: 'Moderator',
							value: `<@${message.author.id}>`,
						},
						{
							name: 'Kicked user',
							value: `<@${member.id}>`,
						},
						{
							name: 'Reason',
							value: reason,
						},
					)
					.setTimestamp()
					.setFooter({ text: `Member ID: ${member.id}` });

				message.channel.send({ embeds: [kickEmbed] });
			})
			.catch((err) => {
				console.log(err);

				message.reply({
					embeds: [
						infoMessageEmbed(
							`:x: Couldn't kick ${member.user.tag}`,
							'ERROR',
						),
					],
				});
			});
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/kick.js \n Actual error: ${err} \n \n`,
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

module.exports = kick;

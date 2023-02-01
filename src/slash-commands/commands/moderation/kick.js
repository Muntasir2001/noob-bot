const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const getMember = require('../../utilities/getMember');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const kick = async (interaction, CMD_NAME, options) => {
	try {
		const user = options.getUser('user', true);
		const reason = options.getString('reason');

		if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
			return interaction.reply({
				embeds: [
					infoMessageEmbed(
						'HEY HEY HEY there, I see what you trynna do there :eyes:',
					),
				],
				ephemeral: false,
			});
		}

		const target = await getMember(interaction, user, false);

		/* if user not found */
		if (!target) {
			console.log('Please tag an user to kick');

			return interaction.reply({
				embeds: [infoMessageEmbed(`Please tag an user to kick`)],
				ephemeral: false,
			});
		}

		/* if user kickable */
		if (!target.kickable) {
			return interaction.reply({
				embeds: [infoMessageEmbed(`User not kickable :(`)],
				ephemeral: false,
			});
		}

		await target
			.kick(reason)
			.then(() => {
				const kickEmbed = new MessageEmbed()
					.setColor('#FF4454')
					.setTitle(`:stop_sign: Kicked ${target.user.tag}`)
					.addFields(
						{
							name: 'Moderator',
							value: `${interaction.member.user}`,
						},
						{
							name: 'Kicked user',
							value: `${user}`,
						},
						{
							name: 'Reason',
							value: reason,
						},
					)
					.setTimestamp()
					.setFooter({ text: `Member ID: ${target.user.id}` });

				interaction.reply({
					embeds: [kickEmbed],
					ephemeral: false,
				});
			})
			.catch((err) => console.log(err));
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/kick.js \n Actual error: ${err} \n \n`,
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

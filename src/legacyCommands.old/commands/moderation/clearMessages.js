const fs = require('fs');

const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const clearMessages = async (message, CMD_NAME, args) => {
	try {
		//fetches all the messages****use it for clearChannel command
		// message.channel.messages.fetch().then((results) => {

		// });
		if (message.member.permissions.has('MANAGE_MESSAGES')) {
			if (args.length === 0) {
				await message.channel.bulkDelete(parseInt(2)).catch((e) =>
					message.channel.send({
						embeds: [infoMessageEmbed(`Welp, something went wrong`)],
					}),
				);
			} else {
				message.channel.bulkDelete(parseInt(args[0]) + 1).catch((e) =>
					message.channel.send({
						embeds: [infoMessageEmbed(`Welp, something went wrong`)],
					}),
				);
			}
		} else {
			return message.reply({
				embeds: [
					infoMessageEmbed(
						'HEY HEY HEY there, I see what you trynna do there :eyes:',
					),
				],
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/clearMessages.js \n Actual error: ${err} \n \n`,
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

module.exports = clearMessages;

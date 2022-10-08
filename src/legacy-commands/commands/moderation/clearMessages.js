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
		console.log({
			message: 'something went wrong in legacy clearMessages.js',
			actualErr: err,
		});

		return;
	}
};

module.exports = clearMessages;

const fs = require('fs');

const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkUserIds = require('../../globalUtils/checkUserIDs');

const sendMessage = async (interaction, CMD_NAME, options) => {
	try {
		const channel = options.getChannel('channel');
		const message = options.getString('message');

		if (!checkUserIds(interaction)) {
			return interaction.reply({
				embeds: [
					infoMessageEmbed('You are not allowed to run this command'),
				],
				ephemeral: false,
			});
		}

		channel.send(message);

		return interaction.reply({
			embeds: [infoMessageEmbed(`Message sent`)],
			ephemeral: false,
		});
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/sendMessage.js \n Actual error: ${err} \n \n`,
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

module.exports = sendMessage;

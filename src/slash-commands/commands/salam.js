const fs = require('fs');

const salam = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');

		if (user) {
			interaction.reply({
				content: `Waalaikumassalam Warahmatullahi Wabarakatuhu ${user} :slight_smile:`,
				ephemeral: false,
			});
		} else {
			interaction.reply({
				content: `Waalaikumassalam Warahmatullahi Wabarakatuhu :slight_smile:`,
				ephemeral: false,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/salam.js \n Actual error: ${err} \n \n`,
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

module.exports = salam;

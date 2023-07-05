const fs = require('fs');

const bye = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');

		if (user) {
			interaction.reply({
				content: `bye ${user} :wave:`,
				ephemeral: false,
			});
		} else {
			interaction.reply({
				content: 'bye :wave:',
				ephemeral: false,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/bye.js \n Actual error: ${err} \n \n`,
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

module.exports = bye;

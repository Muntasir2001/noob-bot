const fs = require('fs');

const goodNight = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');

		if (user) {
			interaction.reply({
				content: `Good Night ${user} :night_with_stars:`,
				ephemeral: false,
			});
		} else {
			interaction.reply({
				content: 'Good Night :night_with_stars:',
				ephemeral: false,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/goodNight.js \n Actual error: ${err} \n \n`,
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

module.exports = goodNight;

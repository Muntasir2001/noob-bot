const fs = require('fs');

const noYou = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');

		if (!user) {
			return interaction.reply({
				content: 'No you!',
				ephemeral: false,
			});
		} else {
			return interaction.reply({
				content: `No you ${user}!`,
				ephemeral: false,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/noyou.js \n Actual error: ${err} \n \n`,
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

module.exports = noYou;

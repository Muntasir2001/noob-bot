const fs = require('fs');

const goodMorning = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(
				`Good Morning ${member} :slight_smile: :cityscape:`,
			);
		} else {
			message.channel.send(`Good Morning :slight_smile: :cityscape:`);
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/goodMorning.js \n Actual error: ${err} \n \n`,
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

module.exports = goodMorning;

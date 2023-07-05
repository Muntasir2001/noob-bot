const fs = require('fs');

const salam = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(
				`Waalaikumassalam Warahmatullahi Wabarakatuhu ${member} :slight_smile:`,
			);
		} else {
			message.channel.send(
				'Waalaikumassalam Warahmatullahi Wabarakatuhu  :slight_smile:',
			);
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/salam.js \n Actual error: ${err} \n \n`,
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

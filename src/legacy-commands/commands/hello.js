const fs = require('fs');

const hello = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(`hello ${member} :slight_smile:`);
		} else {
			message.channel.send('hello :slight_smile:');
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/hello.js \n Actual error: ${err} \n \n`,
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

module.exports = hello;

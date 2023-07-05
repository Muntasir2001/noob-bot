const fs = require('fs');

const getTextChannel = (channelID, message) => {
	try {
		const textChannel = message.guild.channels.resolve(channelID);

		return textChannel;
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommands/utils/getTextChannel.js \n Actual error: ${err} \n \n`,
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

module.exports = getTextChannel;

const setStatus = (message, CMD_NAME, args, client) => {
	try {
		if (message.author.id === '374230181889572876') {
			client.user.setPresence({
				activities: [
					{
						name: args[0],
					},
				],
			});
		} else {
			message.channel.send(
				'you do not have the permission to run this command!',
			);
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/setStatus.js \n Actual error: ${err} \n \n`,
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

module.exports = setStatus;

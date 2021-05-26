const PREFIX = process.env.PREFIX;
// const { client } = require('../bot');

const setStatus = (message, client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'setstatus') {
			if (message.author.id === '374230181889572876') {
				client.user.setPresence({
					activity: {
						name: args[0],
						type: 0,
					},
				});
			} else {
				message.channel.send(
					'you do not have the permission to run this command!',
				);
			}
		}
	}
};

module.exports = setStatus;

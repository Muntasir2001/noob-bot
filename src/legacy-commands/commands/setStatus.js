const PREFIX = process.env.PREFIX;
// const { client } = require('../bot');

const setStatus = (message, CMD_NAME, args, client) => {
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
};

module.exports = setStatus;

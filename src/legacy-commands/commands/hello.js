const hello = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(`hello ${member} :slight_smile:`);
		} else {
			message.channel.send('hello :slight_smile:');
		}
	} catch (err) {
		return {
			message: 'something went wrong in legacy hello.js',
			actualErr: err,
		};
	}
};

module.exports = hello;

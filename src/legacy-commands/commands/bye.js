const bye = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(`bye ${member} :wave:`);
		} else {
			message.channel.send('bye :wave:');
		}
	} catch (err) {
		return {
			message: 'something went wrong in legacy bye.js',
			actualErr: err,
		};
	}
};

module.exports = bye;

const bye = (message, CMD_NAME, args) => {
	if (CMD_NAME === 'bye') {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(`bye ${member} :wave:`);
		} else {
			message.channel.send('bye :wave:');
		}
	}
};

module.exports = bye;

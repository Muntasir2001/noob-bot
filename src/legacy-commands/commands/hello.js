const hello = (message, CMD_NAME, args) => {
	if (CMD_NAME === 'hello') {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(`hello ${member} :slight_smile:`);
		} else {
			message.channel.send('hello :slight_smile:');
		}
	}
};

module.exports = hello;

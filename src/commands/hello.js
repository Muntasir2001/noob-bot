const hello = (message, CMD_NAME) => {
	if (CMD_NAME === 'hello') {
		message.channel.send('hello :slight_smile:');
	}
};

module.exports = hello;

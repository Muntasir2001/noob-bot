const bye = (message, CMD_NAME) => {
	if (CMD_NAME === 'bye') {
		message.channel.send('bye :wave:');
	}
};

module.exports = bye;

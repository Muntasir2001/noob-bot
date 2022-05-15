const getTextChannel = require('../utilities/getTextChannel');

const sendMessage = async (message, CMD_NAME, args) => {
	if (CMD_NAME === 'sm') {
		const channel = await getTextChannel(args[0], message);

		args.shift();

		return channel.send(args.join(' '));
	}
};

module.exports = sendMessage;

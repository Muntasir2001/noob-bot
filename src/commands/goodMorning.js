const PREFIX = process.env.PREFIX;

const goodMorning = (message, CMD_NAME) => {
	if (CMD_NAME === 'gm') {
		message.channel.send('Good Morning :slight_smile: :cityscape:');
	}
};

module.exports = goodMorning;

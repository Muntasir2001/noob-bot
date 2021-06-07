const PREFIX = process.env.PREFIX;

const goodNight = (message, CMD_NAME) => {
	if (CMD_NAME === 'gn') {
		message.channel.send('Good Night :slight_smile: :night_with_stars:');
	}
};

module.exports = goodNight;

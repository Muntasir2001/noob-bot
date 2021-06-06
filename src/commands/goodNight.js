const PREFIX = process.env.PREFIX;

const goodNight = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'gn') {
			message.channel.send('Good Night :slight_smile: :night_with_stars:');
		}
	}
};

module.exports = goodNight;

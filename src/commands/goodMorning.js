const PREFIX = process.env.PREFIX;

const goodMorning = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'gm') {
			message.channel.send('Good Morning :slight_smile: :cityscape:');
		}
	}
};

module.exports = goodMorning;

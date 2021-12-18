const PREFIX = process.env.PREFIX;

const goodNight = (message, CMD_NAME, args) => {
	if (CMD_NAME === 'gn') {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(
				`Good Night ${member} :slight_smile: :night_with_stars:`,
			);
		} else {
			message.channel.send('Good Night :slight_smile: :night_with_stars:');
		}
	}
};

module.exports = goodNight;

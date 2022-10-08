const PREFIX = process.env.PREFIX;

const goodMorning = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(
				`Good Morning ${member} :slight_smile: :cityscape:`,
			);
		} else {
			message.channel.send(`Good Morning :slight_smile: :cityscape:`);
		}
	} catch (err) {
		return {
			message: 'something went wrong in legacy bye.js',
			actualErr: err,
		};
	}
};

module.exports = goodMorning;

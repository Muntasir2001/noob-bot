const salam = (message, CMD_NAME, args) => {
	try {
		if (args.length !== 0) {
			const member = message.mentions.members.first();

			message.channel.send(
				`Waalaikumassalam Warahmatullahi Wabarakatuhu ${member} :slight_smile:`,
			);
		} else {
			message.channel.send(
				'Waalaikumassalam Warahmatullahi Wabarakatuhu  :slight_smile:',
			);
		}
	} catch (err) {
		console.log({
			message: 'something went wrong in legacy salam.js',
			actualErr: err,
		});
	}
};

module.exports = salam;

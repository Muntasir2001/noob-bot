const salam = (message, CMD_NAME, args) => {
	if (CMD_NAME === 'salam') {
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
	}
};

module.exports = salam;

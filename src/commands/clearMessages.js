const PREFIX = process.env.PREFIX;

const clearMessages = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'clear') {
			//fetches all the messages****use it for clearChannel command
			// message.channel.messages.fetch().then((results) => {

			// });
			if (message.member.hasPermission('MANAGE_MESSAGES')) {
				if (args.length === 0) {
					message.channel
						.bulkDelete(parseInt(2))
						.catch((e) =>
							message.channel.send(`Welp, I do not have the permission`),
						);
				} else {
					message.channel
						.bulkDelete(parseInt(args[0]) + 1)
						.catch((e) =>
							message.channel.send(`Welp, I do not have the permission`),
						);
				}
			} else {
				message.reply(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				);
			}
		}
	}
};

module.exports = clearMessages;

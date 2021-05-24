const PREFIX = process.env.PREFIX;

const ban = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'ban') {
			if (!message.member.hasPermission('KICK_MEMBERS'))
				return message.reply(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				);

			if (args.length === 0) return message.reply('please provide an ID');
			console.log(args);

			message.guild.members
				.ban(args[0])
				.then((member) => {
					`${member} is banned from this server :3`;
				})
				.catch((err) => {
					message.channel.send('Welp, I do not have the permissions ;-;');
				});
		}
	}
};

module.exports = ban;

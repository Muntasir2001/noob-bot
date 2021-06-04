const PREFIX = process.env.PREFIX;

const kick = async (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		//kicking people out
		if (CMD_NAME === 'kick') {
			if (!message.member.hasPermission('KICK_MEMBERS')) {
				return message.reply(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				);
			}
			if (args.length === 0) return message.reply('please provide an ID');

			// const member = message.guild.members.cache.get(args[0]);
			const member = await message.guild.members.fetch(args[0]);

			if (member) {
				member
					.kick()
					.then((member) => {
						message.channel.send(
							`${member} was kicked out of the server :3`,
						);
					})
					.catch((err) =>
						message.channel.send(
							'Welp, I do not have the permissions ;-;',
						),
					);
			} else {
				message.reply('Welp, member is not in the server :/');
			}
		}
	}
};

module.exports = kick;

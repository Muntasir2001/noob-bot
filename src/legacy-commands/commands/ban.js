const ban = async (message, CMD_NAME, args, client) => {
	if (CMD_NAME === 'ban') {
		if (!message.member.permissions.has('BAN_MEMBERS'))
			return message.reply(
				'HEY HEY HEY there, I see what you trynna do there :eyes:',
			);

		if (args.length === 0) return message.reply('please provide an ID');

		message.mentions.members.first() ||
			(await client.users.fetch(args[0]).catch((err) => {
				message.channel.send(`${args[0]} is an unknown user`);
			}));

		message.guild.members
			.ban(args[0])
			.then((member) => {
				message.channel.send(
					`${member} has been banned from this server :3`,
				);
			})
			.catch((err) => {
				message.channel.send('Welp, something went wrong');
			});
	}
};

module.exports = ban;

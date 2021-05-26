const PREFIX = process.env.PREFIX;

const serverInfo = (message, client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'serverinfo') {
			client.guilds.cache.forEach((guild) => {
				if (message.guild.id === guild.id) {
					message.channel.send(
						`${guild.name} has a total of ${guild.memberCount} members`,
					);
				}
			});
		}
	}
};

module.exports = serverInfo;

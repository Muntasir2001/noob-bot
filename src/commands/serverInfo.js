const Discord = require('discord.js');

const PREFIX = process.env.PREFIX;

const serverInfo = (message, client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		const { guild } = message;
		const { name, region, memberCount, roles, owner } = guild;
		const icon = guild.iconURL();

		// console.log(name, region, memberCount, icon);
		console.log();

		const infoEmbed = new Discord.MessageEmbed()
			.setColor('#FF4454')
			.setTitle(name)
			.setDescription(`Info about ${name}`)
			.setThumbnail(icon)
			.addFields(
				// { name: '\u200B', value: '\u200B' },
				{
					name: 'Server Owner',
					value: owner,
					inline: true,
				},
				{
					name: 'Region',
					value: region,
					inline: true,
				},
				{
					name: 'Role count',
					value: roles.cache.size,
					inline: true,
				},
				{
					name: 'Number of Members',
					value: memberCount,
					inline: true,
				},
			)
			.setTimestamp()
			.setFooter('Requested by: ');

		if (CMD_NAME === 'serverinfo') {
			// client.guilds.cache.forEach((guild) => {
			// 	if (message.guild.id === guild.id) {
			// 		message.channel.send(`${guild.name} owner: ${guild.owner}`);
			// 	}
			// });

			// roles.cache.forEach((value, key) => {
			// 	message.channel.send(`<@&${key}>`);
			// });

			message.channel.send(infoEmbed);
		}
	}
};

module.exports = serverInfo;

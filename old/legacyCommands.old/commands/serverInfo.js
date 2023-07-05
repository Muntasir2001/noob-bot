const fs = require('fs');

const Discord = require('discord.js');

const serverInfo = (message, CMD_NAME, args, client) => {
	try {
		const { guild } = message;

		const { name, memberCount, roles, ownerId, createdTimestamp } = guild;
		const icon = guild.iconURL();

		const member = message.member.user.tag;

		const infoEmbed = new Discord.MessageEmbed()
			.setColor('#FF4454')
			.setTitle(name)
			.setDescription(`Info about ${name}`)
			.setThumbnail(icon)
			.addFields(
				// { name: '\u200B', value: '\u200B' },
				{
					name: 'Server Owner',
					value: `<@${ownerId}>`,
					inline: true,
				},
				{
					name: 'Role count',
					value: roles.cache.size.toString(),
					inline: true,
				},
				{
					name: 'Number of Members',
					value: memberCount.toString(),
					inline: true,
				},
				{
					name: 'Server created',
					value: new Date(createdTimestamp).toLocaleString(),
					inline: false,
				},
			)
			.setTimestamp()
			.setFooter({ text: `Requested by: ${member}` });

		if (CMD_NAME === 'serverinfo') {
			// client.guilds.cache.forEach((guild) => {
			// 	if (message.guild.id === guild.id) {
			// 		message.channel.send(`${guild.name} owner: ${guild.owner}`);
			// 	}
			// });

			// roles.cache.forEach((value, key) => {
			// 	message.channel.send(`<@&${key}>`);
			// });

			message.channel.send({ embeds: [infoEmbed] });
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/serverInfo.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);

			return false;
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = serverInfo;

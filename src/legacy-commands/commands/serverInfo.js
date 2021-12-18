const Discord = require('discord.js');

const serverInfo = (message, CMD_NAME, args, client) => {
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
		.setFooter(`Requested by: ${member}`);

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
};

module.exports = serverInfo;

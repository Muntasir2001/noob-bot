const { MessageEmbed } = require('discord.js');

const serverInfo = async (interaction, CMD_NAME, options, client) => {
	try {
		const { guild } = interaction;

		const { name, memberCount, roles, ownerId, createdTimestamp } = guild;
		const icon = guild.iconURL();
		// console.log(guild);

		const member = interaction.user.tag;

		const infoEmbed = new MessageEmbed()
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

		return interaction.reply({
			embeds: [infoEmbed],
			ephemeral: false,
		});
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand serverInfo.js',
			actualErr: err,
		});
	}
};

module.exports = serverInfo;

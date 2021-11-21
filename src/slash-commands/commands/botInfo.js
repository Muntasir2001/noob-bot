const { MessageEmbed } = require('discord.js');

const PREFIX = process.env.PREFIX;

const botInfo = async (interaction, CMD_NAME, options, client) => {
	const { guild } = interaction;

	const { name, memberCount, roles, ownerId, createdTimestamp } = guild;
	const icon = guild.iconURL();
	// console.log(guild);

	const member = interaction.user.tag;
	const { user, guilds } = client;

	const botInfoEmbed = new MessageEmbed()
		.setColor('#ff4454')
		.setThumbnail(user.displayAvatarURL())
		.setAuthor(`${user.username}`, `${user.displayAvatarURL()}`)
		.addFields(
			// { name: '\u200B', value: '\u200B' },
			{ name: 'Bot Tag', value: `${user.tag}` },
			{ name: 'Bot version', value: `1.0.0` },
			{ name: 'Bot command prefix', value: `${PREFIX}` },
			{
				name: 'Time since last restart',
				value: `${process.uptime().toFixed(2)}s`,
			},
			{
				name: 'Server Count',
				value: `${guilds.cache.size.toString()}`,
			},
		)
		.setTimestamp()
		.setFooter(`Requested by: ${member}`);

	return interaction.reply({
		embeds: [botInfoEmbed],
		ephemeral: false,
	});
};

module.exports = botInfo;

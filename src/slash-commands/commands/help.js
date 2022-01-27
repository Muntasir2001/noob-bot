const { MessageEmbed } = require('discord.js');

const help = async (interaction, CMD_NAME, options, client) => {
	const member = interaction.user.tag;

	const helpEmbed = new MessageEmbed()
		.setColor('#FF4454')
		.setTitle(`${client.user.username}`)
		.setDescription('Here is the list of commands you can use')
		.setThumbnail(`${client.user.displayAvatarURL()}`)
		.addFields(
			{
				name: `Kick`,
				value: '`/kick @mention reason` to kick the user out from the server',
			},
			{
				name: 'Ban',
				value: '`/ban @mention reason days` to ban the user from the server',
			},
			{
				name: 'Clear',
				value: '`/clear number` to clear that number of messages. "number" default value is 1',
			},
			{
				name: 'serverinfo',
				value: '`/serverinfo` to see info about the server (under development)',
			},
			{
				name: 'botinfo',
				value: '`/botinfo` to see info about the bot (under development)',
			},
			{
				name: 'userinfo',
				value: '`/userinfo @user` to see info about the user. Just putting `/userinfo` will show info about you (under development)',
			},
			{
				name: 'hello',
				value: '`/hello @mention` to say hello to an user (@mention is optional)',
			},
			{
				name: 'bye',
				value: '`/bye @mention` to say bye to an user (@mention is optional)',
			},
			{
				name: 'gm',
				value: '`/gm @mention` to say good morning to an user (@mention is optional)',
			},
			{
				name: 'gn',
				value: '`/gn @mention` to say good night to an user (@mention is optional)',
			},
			{
				name: 'no u',
				value: '`/nou @user` or nou to say no u',
			},
			// {
			// 	name: 'clear',
			// 	value: `${PREFIX}clear <no of messages to clear> to delete the messages above. Just putting ${PREFIX}clear will delete one message`,
			// },
			// { name: '\u200B', value: '\u200B' },
		)
		.setTimestamp()
		.setFooter(`Requested by: ${member}`);

	return interaction.reply({
		embeds: [helpEmbed],
		ephemeral: false,
	});
};

module.exports = help;

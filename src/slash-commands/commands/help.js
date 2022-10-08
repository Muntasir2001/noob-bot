const { MessageEmbed } = require('discord.js');

const help = async (interaction, CMD_NAME, options, client) => {
	try {
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
					name: 'Timeout',
					value: '`/timeout @mention reason time` to timeout the user from the server',
				},
				{
					name: 'Clear',
					value: '`/clear number` to clear that number of messages. "number" default value is 1',
				},
				{
					name: 'Serverinfo',
					value: '`/serverinfo` to see info about the server (under development)',
				},
				{
					name: 'Botinfo',
					value: '`/botinfo` to see info about the bot (under development)',
				},
				{
					name: 'Userinfo',
					value: '`/userinfo @user` to see info about the user. Just putting `/userinfo` will show info about you (under development)',
				},
				{
					name: 'Hello',
					value: '`/hello @user` to say hello to an user (@user is optional)',
				},
				{
					name: 'Bye',
					value: '`/bye @user` to say bye to an user (@user is optional)',
				},
				{
					name: 'gm',
					value: '`/gm @user` to say good morning to an user (@user is optional)',
				},
				{
					name: 'gn',
					value: '`/gn @user` to say good night to an user (@user is optional)',
				},
				{
					name: 'no u',
					value: '`/nou @user` or nou to say no u (@user is optional)',
				},
				{
					name: 'Avatar',
					value: '`/avatar @user` to see avatar of an user. Just putting `/avatar` will show you the avatar of yourself (@user is optional)',
				},
				// { name: '\u200B', value: '\u200B' },
			)
			.setTimestamp()
			.setFooter({ text: `Requested by: ${member}` });

		return interaction.reply({
			embeds: [helpEmbed],
			ephemeral: false,
		});
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand help.js',
			actualErr: err,
		});
	}
};

module.exports = help;

const Discord = require('discord.js');

const PREFIX = process.env.PREFIX;

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#FF4454')
	.setTitle('Noob Bot')
	.setDescription('Here is the list of commands you can use')
	.setThumbnail('https://i.ibb.co/0YQ68pT/noobot.png')
	.addFields(
		{
			name: 'Kick',
			value: `${PREFIX}kick <uid> or @mention to kick the user out from the server`,
		},
		{
			name: 'Ban',
			value: `${PREFIX}ban <uid> or @mention to ban the user from the server`,
		},
		{
			name: 'serverinfo',
			value: `${PREFIX}serverinfo to see info about the server (under development)`,
		},
		{
			name: 'botinfo',
			value: `${PREFIX}botinfo to see info about the bot (under development)`,
		},
		{
			name: 'userinfo',
			value: `${PREFIX}userinfo <uid> or @user to see info about the user. Just putting ${PREFIX} will show info about you (under development)`,
		},
		{
			name: 'hello',
			value: `${PREFIX}hello to say hello`,
		},
		{
			name: 'bye',
			value: `${PREFIX}bye to say bye`,
		},
		{
			name: 'gm',
			value: `${PREFIX}gm to say good morning`,
		},
		{
			name: 'gn',
			value: `${PREFIX}gn to say good night`,
		},
		{
			name: 'no u',
			value: `${PREFIX}nou <@user> or nou to say no u`,
		},
		{
			name: 'clear',
			value: `${PREFIX}clear <no of messages to clear> to delete the messages above. Just putting ${PREFIX}clear will delete one message`,
		},
		// { name: '\u200B', value: '\u200B' },
	)
	.setTimestamp();

const help = (message, CMD_NAME) => {
	if (CMD_NAME === 'help') {
		message.channel.send({ embeds: [helpEmbed] });
	}
};

module.exports = help;
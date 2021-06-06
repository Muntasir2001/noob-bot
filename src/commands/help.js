const Discord = require('discord.js');

const PREFIX = process.env.PREFIX;

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#FF4454')
	.setTitle('Noob Bot')
	.setDescription('Here is the list of commands you can use')
	.setThumbnail('https://i.ibb.co/0YQ68pT/noobot.png')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
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
			name: 'clear',
			value: `${PREFIX}clear <no of messages to clear> to delete the messages above. ${PREFIX}clear will just delete one message`,
		},
		{ name: '\u200B', value: '\u200B' },
	)
	.setTimestamp();

const help = (message, client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'help') {
			message.channel.send(helpEmbed);
		}
	}
};

module.exports = help;

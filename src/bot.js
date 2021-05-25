require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
});

const basicCommands = require('./commands/basicCommands');
const ban = require('./commands/ban');
const kick = require('./commands/kick');
const clearMessages = require('./commands/clearMessages');

const PREFIX = process.env.PREFIX;

//status of the bot
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in BEEP BEEP 🤖`);
});

//for setting status of the bot
const setStatus = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (
			CMD_NAME === 'setstatus' &&
			message.author.id === '374230181889572876'
		) {
			client.user.setPresence({
				activity: {
					name: args[0],
					type: 0,
				},
			});
		} else {
			message.channel.send(`You don't have the permission to do this!`);
		}
	}
};

//for printing out serverinfo
const serverInfo = (message) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'serverinfo') {
			client.guilds.cache.forEach((guild) => {
				message.channel.send(
					`${guild.name} has a total of ${guild.memberCount} members`,
				);
			});
		}
	}
};

//message event listener - when anyone types a message/certain command in the text chat
client.on('message', ban);
client.on('message', kick);
client.on('message', basicCommands);
client.on('message', serverInfo);
client.on('message', clearMessages);
client.on('message', setStatus);

//add reaction roles
client.on('messageReactionAdd', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.add('845297466521813043');
				break;

			case '💻':
				member.roles.add('845297666069233735');
				break;
		}
	}
});

//remove roles with reactions
client.on('messageReactionRemove', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.remove('845297466521813043');
				break;

			case '💻':
				member.roles.remove('845297666069233735');
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

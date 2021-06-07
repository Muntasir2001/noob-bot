require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
});

const basicCommands = require('./commands/basicCommands');
const commandHandler = require('./commands');
const welcome = require('./commands/welcome');

//status of the bot
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in BEEP BEEP 🤖`);
});

//message event listener - when anyone types a message/certain command in the text chat
client.on('message', (message) => commandHandler(message, client));

client.on('guildMemberAdd', welcome);

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

module.exports = { client };

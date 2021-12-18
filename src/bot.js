require('dotenv').config();
const { Client, Intents, Constants } = require('discord.js');

const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
	],
});

// const basicCommands = require('./commands/basicCommands');
const registerCommands = require('./slash-commands/registerCommands');
const commandHandler = require('./legacy-commands/commands');
const slashCommandHandler = require('./slash-commands/slashCommandHandler');
const commandsList = require('./slash-commands/registerCommandsList');
const welcome = require('./legacy-commands/commands/welcome');

//status of the bot
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in BEEP BEEP 🤖`);

	const guildId = process.env.GUILD_ID;

	const guild = client.guilds.cache.get(guildId);
	let commands;

	if (guild && guildId != undefined) {
		commands = guild.commands;
	} else {
		commands = client.application.commands;
	}

	registerCommands(commands, guild, commandsList);
});

client.on('interactionCreate', async (interaction) => {
	slashCommandHandler(interaction, client);
});

//message event listener - when anyone types a message/certain command in the text chat (v12)
client.on('messageCreate', (message) => commandHandler(message, client));

/* when some joins the server */
/* STILL INCOMPLETE */
// client.on('guildMemberAdd', welcome);

// //add reaction roles
// client.on('messageReactionAdd', (reaction, user) => {
// 	const { name } = reaction.emoji;
// 	const member = reaction.message.guild.members.cache.get(user.id);
// 	if (reaction.message.id === '845261229776830464') {
// 		switch (name) {
// 			case '🖥️':
// 				member.roles.add('845297466521813043');
// 				break;

// 			case '💻':
// 				member.roles.add('845297666069233735');
// 				break;
// 		}
// 	}
// });

// //remove roles with reactions
// client.on('messageReactionRemove', (reaction, user) => {
// 	const { name } = reaction.emoji;
// 	const member = reaction.message.guild.members.cache.get(user.id);
// 	if (reaction.message.id === '845261229776830464') {
// 		switch (name) {
// 			case '🖥️':
// 				member.roles.remove('845297466521813043');
// 				break;

// 			case '💻':
// 				member.roles.remove('845297666069233735');
// 				break;
// 		}
// 	}
// });

client.login(process.env.DISCORDJS_BOT_TOKEN);

module.exports = { client };

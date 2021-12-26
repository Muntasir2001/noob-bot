require('dotenv').config();
const { Client, Intents, Constants } = require('discord.js');
const registerCommands = require('./slash-commands/registerCommands');
const commandHandler = require('./legacy-commands/commands');
const slashCommandHandler = require('./slash-commands/slashCommandHandler');
const commandsList = require('./slash-commands/registerCommandsList');
const welcome = require('./legacy-commands/commands/welcome');
const messageDelete = require('./events/messageDelete');
const messageDeleteBulk = require('./events/messageDeleteBulk');
const timeout = require('./events/timeout');

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

//message event listener - when anyone types a message/certain command in the text chat (v13)
client.on('messageCreate', (message) => commandHandler(message, client));

client.on('messageDelete', (message) => messageDelete(message, client));

client.on('messageDeleteBulk', (message) => messageDeleteBulk(message, client));

// client.on('guildMemberUpdate', (message) => timeout(message, client));

client.login(process.env.DISCORDJS_BOT_TOKEN);

module.exports = { client };

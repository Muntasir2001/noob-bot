import fs from 'fs';

require('dotenv').config();
import { Client, Intents, Constants, Message } from 'discord.js';
// import registerCommands from './slashCommands/registerCommands';
// import commandHandler from './legacyCommands/commands';
// import slashCommandHandler from './slashCommands/slashCommandHandler';
// import buttonHandler from './buttonHandler/buttonHandler';
// import commandsList from './slashCommands/registerCommandsList';
// import welcome from './legacy-commands/commands/welcome';
// import messageDelete from './events/messageDelete';
// import messageDeleteBulk from './events/messageDeleteBulk';
// import timeout from './events/timeout';

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
	console.log(`${client.user?.tag} has logged in BEEP BEEP 🤖`);

	// write to file whenever bot restarts
	// ${new Date()} : Bot restarted
	try {
		fs.appendFile(
			'logs/restart.txt',
			`${new Date()} : Bot restarted \n`,
			(err) => {
				if (err) throw err;
			},
		);
	} catch (err) {
		console.log('Logging failed');
	}

	const guildId: string | any = process.env.GUILD_ID;
	const guild = client.guilds.cache.get(guildId);
	// let commands;

	// if (guild && guildId != undefined) {
	// 	commands = guild.commands;
	// } else {
	// 	commands = client.application?.commands;
	// }

	// slash command register
	// registerCommands(commands, guild, commandsList);

	// set bot status
	client.user?.setPresence({
		activities: [{ name: `/help` }],
	});

	// run every 12 hours again to make sure it stays visible
	setInterval(() => {
		client.user?.setPresence({
			activities: [{ name: `/help` }],
		});
	}, 1000 * 60 * 720);
});

// client.on('interactionCreate', async (interaction) => {
// 	if (interaction.isButton()) {
// 		await buttonHandler(interaction, client);
// 	} else {
// 		await slashCommandHandler(interaction, client);
// 	}
// });

//message event listener - when anyone types a message/certain command in the text chat (v13)
// client.on('messageCreate', (message) => commandHandler(message, client));

// client.on('messageDelete', (message) => messageDelete(message, client));

// client.on('messageDeleteBulk', (message) => messageDeleteBulk(message, client));

// client.on('guildMemberUpdate', (message) => timeout(message, client));

client.login(process.env.DISCORDJS_BOT_TOKEN);

export default client;

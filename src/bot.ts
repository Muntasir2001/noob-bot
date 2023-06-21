import fs from 'fs';

require('dotenv').config();
import { Client, Intents, Constants, Message } from 'discord.js';

import slashCommandsList from './slashCommands/slashCommandsList';
import interactionCreate from './listeners/interactionCreate';
// import commandHandler from './legacyCommands/commands';
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
client.on('ready', async () => {
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
	let commands;

	if (guild && guildId != undefined) {
		commands = guild.commands;
	} else {
		commands = client.application!.commands;
	}

	await commands.set(slashCommandsList);

	console.log(`${client.user?.tag} has logged in BEEP BEEP 🤖`);

	// set bot status
	client.user?.setPresence({
		activities: [{ name: `/help` }],
	});

	// run every 6 hours again to make sure it stays visible
	setInterval(() => {
		client.user?.setPresence({
			activities: [{ name: `/help` }],
		});
	}, 1000 * 60 * 360);
});

interactionCreate(client);

//message event listener - when anyone types a message/certain command in the text chat (v13)
// client.on('messageCreate', (message) => commandHandler(message, client));

// client.on('messageDelete', (message) => messageDelete(message, client));

// client.on('messageDeleteBulk', (message) => messageDeleteBulk(message, client));

// client.on('guildMemberUpdate', (message) => timeout(message, client));

client.login(process.env.DISCORDJS_BOT_TOKEN);

export default client;

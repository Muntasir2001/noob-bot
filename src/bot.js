require('dotenv').config();
const { Client, Intents, Constants } = require('discord.js');

const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// const basicCommands = require('./commands/basicCommands');
const registerCommands = require('./slash-commands/registerCommands');
const commandHandler = require('./commands');
const slashCommandHandler = require('./slash-commands/slashCommandHandler');
const welcome = require('./commands/welcome');

//status of the bot
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in BEEP BEEP 🤖`);

	const guildId = '808385971418693652';
	const guild = client.guilds.cache.get(guildId);
	let commands;

	if (guild) {
		commands = guild.commands;
	} else {
		commands = client.application.commands;
	}

	const commandsObject = [
		{
			name: 'ping',
			description: 'Replies with pong',
			options: [],
		},
		{
			name: 'add',
			description: 'Add two numbers',
			options: [
				{
					name: 'num1',
					description: 'The first number',
					required: true,
					type: Constants.ApplicationCommandOptionTypes.NUMBER,
				},
				{
					name: 'num2',
					description: 'The second number',
					required: true,
					type: Constants.ApplicationCommandOptionTypes.NUMBER,
				},
			],
		},
	];

	registerCommands(commands, guild, commandsObject);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		interaction.reply({ content: 'Wrong/unknown command' });

		return 'Unknown command';
	}
	// const { commandName, options } = interaction;

	// if (commandName === 'ping') {
	// 	interaction.reply({
	// 		content: 'pong',
	// 		ephemeral: false,
	// 	});
	// } else if (commandName === 'add') {
	// 	const num1 = options.getNumber('num1');
	// 	const num2 = options.getNumber('num2');

	// 	interaction.reply({
	// 		content: `The sum is ${num1 + num2}`,
	// 		ephemeral: false,
	// 	});
	// }
	slashCommandHandler(interaction, client);
});

//message event listener - when anyone types a message/certain command in the text chat (v12)
// client.on('messageCreate', (message) => commandHandler(message, client));

/* when some joins the server */
/* STILL INCOMPLETE */
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

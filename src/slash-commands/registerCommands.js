const { Constants } = require('discord.js');

/* {
   name: commandName,
   description: commandDescription,
   options: [{name, desc, required, type}] (optional)
} */

const registerCommands = (commands, guild, commandsArray) => {
	commandsArray.forEach((command) => {
		if (command.options.length === 0) {
			commands.create({
				name: command.name,
				description: command.description,
			});
		} else {
			commands.create({
				name: command.name,
				description: command.description,
				options: command.options,
			});
		}
	});

	// commands.create({
	// 	name: 'ping',
	// 	description: 'replies with pong',
	// });

	// commands.create({
	// 	name: 'add',
	// 	description: 'Add two numbers',
	// 	options: [
	// 		{
	// 			name: 'num1',
	// 			description: 'The first number',
	// 			required: true,
	// 			type: Constants.ApplicationCommandOptionTypes.NUMBER,
	// 		},
	// 		{
	// 			name: 'num2',
	// 			description: 'The second number',
	// 			required: true,
	// 			type: Constants.ApplicationCommandOptionTypes.NUMBER,
	// 		},
	// 	],
	// });
};

module.exports = registerCommands;

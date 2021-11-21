const slashCommands = require('./slashCommands');

const slashCommandHandler = async (interaction, client) => {
	const { commandName, options } = interaction;

	console.log(commandName);
	// console.log(slashCommands());

	if (commandName in slashCommands) {
		// console.log('command name in object', slashCommands[commandName]);

		slashCommands[commandName](interaction, commandName, options, client);
	}
};

module.exports = slashCommandHandler;

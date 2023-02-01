const slashCommands = require('./slashCommands');

const slashCommandHandler = async (interaction, client) => {
	const { commandName, options } = interaction;

	if (commandName in slashCommands) {
		slashCommands[commandName](interaction, commandName, options, client);
	}
};

module.exports = slashCommandHandler;

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
};

module.exports = registerCommands;

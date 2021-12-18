const bye = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (user) {
		interaction.reply({
			content: `bye ${user} :wave:`,
			ephemeral: false,
		});
	} else {
		interaction.reply({
			content: 'bye :wave:',
			ephemeral: false,
		});
	}
};

module.exports = bye;

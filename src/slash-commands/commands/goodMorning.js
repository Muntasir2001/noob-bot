const goodMorning = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (user) {
		interaction.reply({
			content: `Good Morning ${user} :cityscape:`,
			ephemeral: false,
		});
	} else {
		interaction.reply({
			content: 'Good Morning :cityscape:',
			ephemeral: false,
		});
	}
};

module.exports = goodMorning;

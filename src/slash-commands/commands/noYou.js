const noYou = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (!user) {
		return interaction.reply({
			content: 'No you!',
			ephemeral: false,
		});
	} else {
		return interaction.reply({
			content: `No you ${user}!`,
			ephemeral: false,
		});
	}
};

module.exports = noYou;

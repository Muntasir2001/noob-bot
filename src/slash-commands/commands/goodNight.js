const goodNight = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (user) {
		interaction.reply({
			content: `Good Night ${user} :night_with_stars:`,
			ephemeral: false,
		});
	} else {
		interaction.reply({
			content: 'Good Night :night_with_stars:',
			ephemeral: false,
		});
	}
};

module.exports = goodNight;

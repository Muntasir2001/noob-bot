const goodNight = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand goodNight.js',
			actualErr: err,
		});
	}
};

module.exports = goodNight;

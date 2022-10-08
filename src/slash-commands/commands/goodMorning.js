const goodMorning = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand goodMorning.js',
			actualErr: err,
		});
	}
};

module.exports = goodMorning;

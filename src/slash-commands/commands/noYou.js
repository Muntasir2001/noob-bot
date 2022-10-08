const noYou = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand noYou.js',
			actualErr: err,
		});
	}
};

module.exports = noYou;

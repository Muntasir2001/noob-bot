const bye = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand bye.js',
			actualErr: err,
		});
	}
};

module.exports = bye;

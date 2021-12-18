const hello = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (user) {
		interaction.reply({
			content: `hello ${user} :slight_smile:`,
			ephemeral: false,
		});
	} else {
		interaction.reply({
			content: `hello :slight_smile:`,
			ephemeral: false,
		});
	}
};

module.exports = hello;

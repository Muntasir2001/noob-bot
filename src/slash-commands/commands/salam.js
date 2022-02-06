const salam = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	if (user) {
		interaction.reply({
			content: `Waalaikumassalam Warahmatullahi Wabarakatuhu ${user} :slight_smile:`,
			ephemeral: false,
		});
	} else {
		interaction.reply({
			content: `Waalaikumassalam Warahmatullahi Wabarakatuhu :slight_smile:`,
			ephemeral: false,
		});
	}
};

module.exports = salam;

const salam = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand salam.js',
			actualErr: err,
		});
	}
};

module.exports = salam;

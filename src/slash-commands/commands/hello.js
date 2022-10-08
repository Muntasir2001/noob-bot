const hello = async (interaction, CMD_NAME, options, client) => {
	try {
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
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand hello.js',
			actualErr: err,
		});
	}
};

module.exports = hello;

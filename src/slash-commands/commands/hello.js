const hello = async (interaction, CMD_NAME, options, client) => {
	interaction.reply({
		content: 'hello :slight_smile:',
		ephemeral: false,
	});
};

module.exports = hello;

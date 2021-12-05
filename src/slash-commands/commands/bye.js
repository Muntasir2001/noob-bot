const bye = async (interaction, CMD_NAME, options, client) => {
	interaction.reply({
		content: 'bye :wave:',
		ephemeral: false,
	});
};

module.exports = bye;

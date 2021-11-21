const goodMorning = async (interaction, CMD_NAME, options, client) => {
	interaction.reply({
		content: 'Good Morning :cityscape:',
		ephemeral: false,
	});
};

module.exports = goodMorning;

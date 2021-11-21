const goodNight = async (interaction, CMD_NAME, options, client) => {
	interaction.reply({
		content: 'Good Morning :night_with_stars:',
		ephemeral: false,
	});
};

module.exports = goodNight;

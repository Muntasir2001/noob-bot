const ping = (interaction, CMD_NAME, options) => {
	// if (CMD_NAME === 'ping') {
	interaction.reply({
		content: 'pong',
		ephemeral: false,
	});
	// }
};

module.exports = ping;

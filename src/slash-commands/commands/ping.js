const ping = (interaction, CMD_NAME, options) => {
	// if (CMD_NAME === 'ping') {
	console.log('i have been called');
	interaction.reply({
		content: 'pong',
		ephemeral: false,
	});
	// }
};

module.exports = ping;

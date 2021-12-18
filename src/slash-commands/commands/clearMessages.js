const { Channel } = require('discord.js');

const clearMessages = async (interaction, CMD_NAME, options) => {
	const numberOfMessages = options.getNumber('number') || 1;

	const { size } = await interaction.channel.bulkDelete(
		numberOfMessages,
		true,
	);

	return interaction.reply({
		content: `Deleted ${size} messages`,
		ephemeral: true,
	});
};

module.exports = clearMessages;

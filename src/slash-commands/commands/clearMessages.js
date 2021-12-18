const { Channel } = require('discord.js');

const clearMessages = async (interaction, CMD_NAME, options) => {
	const numberOfMessages = options.getNumber('number') || 1;

	if (!interaction.memberPermissions.has('MANAGE_MESSAGES')) {
		return interaction.reply({
			content: 'HEY HEY HEY there, I see what you trynna do there :eyes:',
			ephemeral: false,
		});
	}

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

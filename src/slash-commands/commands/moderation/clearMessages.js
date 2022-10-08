const { Channel } = require('discord.js');

const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const clearMessages = async (interaction, CMD_NAME, options) => {
	try {
		const numberOfMessages = options.getNumber('number') || 1;

		if (!interaction.memberPermissions.has('MANAGE_MESSAGES')) {
			return interaction.reply({
				embeds: [
					infoMessageEmbed(
						'HEY HEY HEY there, I see what you trynna do there :eyes:',
					),
				],
				ephemeral: false,
			});
		}

		// first way of deleting the messages
		// const { size } = await interaction.channel.bulkDelete(
		// 	numberOfMessages,
		// 	true,
		// );

		// second way of deleting the messages
		const messages = await interaction.channel.messages.fetch({
			limit: numberOfMessages,
		});
		const { size } = messages;

		messages.forEach((message) => message.delete());

		return interaction.reply({
			embeds: [infoMessageEmbed(`Deleted ${size} messages`)],
			ephemeral: true,
		});
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand clearMessages.js',
			actualErr: err,
		});
	}
};

module.exports = clearMessages;

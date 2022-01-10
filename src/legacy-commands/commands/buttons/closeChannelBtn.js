const { MessageActionRow, MessageButton } = require('discord.js');

const closeChannelBtn = (message, client) => {
	const close = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId('close_current_channel')
			.setLabel('Close channel')
			.setStyle('DANGER'),
	);

	return close;
};

module.exports = closeChannelBtn;

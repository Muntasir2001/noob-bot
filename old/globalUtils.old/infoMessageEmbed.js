const { MessageEmbed } = require('discord.js');

const infoMessageEmbed = (message, status) => {
	const infoEmbed = new MessageEmbed().setTitle(message).setTimestamp();

	switch (status) {
		case 'WARNING':
			infoEmbed.setColor('#D83C3E');
		case 'SUCCESS':
			infoEmbed.setColor('#3BA55C');
		case 'ERROR':
			infoEmbed.setColor('#D83C3E');
		default:
			infoEmbed.setColor('#FF4454');
	}

	return infoEmbed;
};

module.exports = infoMessageEmbed;

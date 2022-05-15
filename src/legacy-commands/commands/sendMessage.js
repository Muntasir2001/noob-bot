const getTextChannel = require('../utilities/getTextChannel');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const sendMessage = async (message, CMD_NAME, args) => {
	if (CMD_NAME === 'sm') {
		if (!args[0]) {
			return message.reply({
				embeds: [
					infoMessageEmbed('Please provide channel ID or tag a channel'),
				],
			});
		}

		if (!args[1]) {
			return message.reply({
				embeds: [infoMessageEmbed('Please provide a message')],
			});
		}

		const channel = await getTextChannel(args[0], message);

		args.shift();

		if (channel !== null) {
			return channel.send(args.join(' '));
		} else {
			return message.reply({
				embeds: [
					infoMessageEmbed('Invalid channel ID or something went wrong!'),
				],
			});
		}
	}
};

module.exports = sendMessage;

const getTextChannel = require('../utilities/getTextChannel');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkUserIds = require('../../globalUtils/checkUserIDs');

const sendMessage = async (message, CMD_NAME, args) => {
	try {
		if (!checkUserIds(message)) {
			return message.reply({
				embeds: [
					infoMessageEmbed('You are not allowed to run this command'),
				],
			});
		}

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

		let channel;

		if (args[0].charAt(0) === '<' && args[0].charAt(1) === '#') {
			channel = await getTextChannel(args[0].slice(2).slice(0, -1), message);
		} else {
			channel = await getTextChannel(args[0], message);
		}

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
	} catch (err) {
		console.log({
			message: 'something went wrong in legacy sendMessage.js',
			actualErr: err,
		});
	}
};

module.exports = sendMessage;

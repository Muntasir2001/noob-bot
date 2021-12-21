const Discord = require('discord.js');

const messageDeleteLogger = (
	message,
	executor,
	target,
	guild,
	logChannelId,
	client,
) => {
	const { content, channelId, author, id } = message;

	const logEmbed = new Discord.MessageEmbed()
		.setColor('#FF4454')
		.setTitle('Message Deleted')
		.setThumbnail('https://i.ibb.co/0YQ68pT/noobot.png');

	// console.log(executor.displayAvatarURL());
};

module.exports = messageDeleteLogger;

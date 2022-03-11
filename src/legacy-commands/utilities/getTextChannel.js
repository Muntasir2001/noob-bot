const getTextChannel = (channelID, message) => {
	const textChannel = message.guild.channels.resolve(channelID);

	return textChannel;
};

module.exports = getTextChannel;

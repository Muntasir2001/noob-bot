const getTextChannel = (channelID, message) => {
	try {
		const textChannel = message.guild.channels.resolve(channelID);

		return textChannel;
	} catch (err) {
		console.log(err);
	}
};

module.exports = getTextChannel;

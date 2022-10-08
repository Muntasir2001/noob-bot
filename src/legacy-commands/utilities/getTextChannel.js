const getTextChannel = (channelID, message) => {
	try {
		const textChannel = message.guild.channels.resolve(channelID);

		return textChannel;
	} catch (err) {
		console.log({
			message: 'something went wrong in legacy util getTextChannel.js',
			actualErr: err,
		});
	}
};

module.exports = getTextChannel;

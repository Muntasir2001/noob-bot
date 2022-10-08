const getTextChannelByGuild = async (guildId, channelID, client, message) => {
	try {
		const guild = await client.guilds.resolve(guildId);
		const textChannel = await guild.channels.resolve(channelID);

		return textChannel;
	} catch (err) {
		console.log({
			message:
				'something went wrong in legacy util getTextChannelByGuild.js',
			actualErr: err,
		});

		return;
	}
};

module.exports = getTextChannelByGuild;

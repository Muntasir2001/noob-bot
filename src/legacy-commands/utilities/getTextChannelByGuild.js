const getTextChannelByGuild = async (guildId, channelID, client, message) => {
	try {
		const guild = await client.guilds.resolve(guildId);
		const textChannel = await guild.channels.resolve(channelID);

		return textChannel;
	} catch (errr) {
		return;
	}
};

module.exports = getTextChannelByGuild;

const getChannelCategory = async (guild, categoryName) => {
	try {
		let allChannels;
		let wantedChannelID;
		// GUILD_CATEGORY

		await guild.channels
			.fetch()
			.then((channels) => (allChannels = channels))
			.catch((err) => console.log(err));

		allChannels.find((channel) => {
			if (
				channel &&
				channel.type === 'GUILD_CATEGORY' &&
				channel.name === categoryName
			) {
				wantedChannelID = channel.id;

				return true;
			}
		});

		return wantedChannelID;
	} catch (err) {
		console.log(err);
	}
};

module.exports = getChannelCategory;

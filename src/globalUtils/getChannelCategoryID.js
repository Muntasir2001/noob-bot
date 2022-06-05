const getChannelCategory = async (guild, categoryName) => {
	try {
		let allChannels;
		let wantedChannelID;
		// GUILD_CATEGORY

		await guild.channels
			.fetch()
			.then((channels) => (allChannels = channels))
			.catch(console.error);

		allChannels.forEach((channel) => {
			if (
				channel.name === categoryName &&
				channel.type === 'GUILD_CATEGORY'
			) {
				wantedChannelID = channel.id;

				return;
			}
		});

		// console.log(wantedChannelID);
		return wantedChannelID;
	} catch (e) {
		if (e !== 'Break') throw e;
	}
};

module.exports = getChannelCategory;

const checkChannelCategoryExist = async (guild, categoryName) => {
	try {
		let allChannels;
		let isCategoryExist = false;
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
				isCategoryExist = true;

				return true;
			}
		});

		return isCategoryExist;
	} catch (err) {
		console.log(err);
		return false;
	}
};

module.exports = checkChannelCategoryExist;

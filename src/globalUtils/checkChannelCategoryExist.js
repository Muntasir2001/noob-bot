const checkChannelCategoryExist = async (guild, categoryName) => {
	let allChannels;
	let isCategoryExist = false;
	// GUILD_CATEGORY

	await guild.channels
		.fetch()
		.then((channels) => (allChannels = channels))
		.catch(console.error);

	allChannels.forEach((channel) => {
		if (channel.type === 'GUILD_CATEGORY' && channel.name === categoryName) {
			isCategoryExist = true;

			return;
		}
	});

	return isCategoryExist;
};

module.exports = checkChannelCategoryExist;

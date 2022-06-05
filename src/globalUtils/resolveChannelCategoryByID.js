const resolveChannelCategoryByID = async (guild, categoryID) => {
	return await guild.channels.resolve(categoryID);
};

module.exports = resolveChannelCategoryByID;

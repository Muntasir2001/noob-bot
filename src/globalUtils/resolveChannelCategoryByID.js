const resolveChannelCategoryByID = async (guild, categoryID) => {
	try {
		return await guild.channels.resolve(categoryID);
	} catch (err) {
		console.log(err);
	}
};

module.exports = resolveChannelCategoryByID;

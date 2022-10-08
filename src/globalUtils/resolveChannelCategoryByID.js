const resolveChannelCategoryByID = async (guild, categoryID) => {
	try {
		return await guild.channels.resolve(categoryID);
	} catch (err) {
		console.log({
			message:
				'something went wrong in global resolveChannelCategoryByID.js',
			actualErr: err,
		});
	}
};

module.exports = resolveChannelCategoryByID;

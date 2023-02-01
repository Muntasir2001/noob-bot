const fs = require('fs');

const resolveChannelCategoryByID = async (guild, categoryID) => {
	try {
		return await guild.channels.resolve(categoryID);
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in globalUtils/resolveChannelCategoryID.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = resolveChannelCategoryByID;

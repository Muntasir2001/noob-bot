const fs = require('fs');

const checkChannelCategoryExist = async (guild, categoryName) => {
	try {
		let allChannels;
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
				return true;
			}
		});

		return false;
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in globalUtils/checkChannelCategoryExist.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);

			return false;
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = checkChannelCategoryExist;

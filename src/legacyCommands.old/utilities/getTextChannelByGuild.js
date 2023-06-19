const fs = require('fs');

const getTextChannelByGuild = async (guildId, channelID, client, message) => {
	try {
		const guild = await client.guilds.resolve(guildId);
		const textChannel = await guild.channels.resolve(channelID);

		return textChannel;
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/utils/getTextChannelByGuild.js \n Actual error: ${err} \n \n`,
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

module.exports = getTextChannelByGuild;

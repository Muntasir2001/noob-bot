const fs = require('fs');

const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');

const getMember = async (client, userID, message, force) => {
	try {
		const member = await message.guild.members
			.fetch({ user: userID, force: force })
			.catch((err) => {
				message.channel.send({
					embeds: [
						infoMessageEmbed(`:x: ${userID} is an unknown user`, 'ERROR'),
					],
				});
				console.log(err);
			});

		return member;
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/utils/getMember.js \n Actual error: ${err} \n \n`,
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

module.exports = getMember;

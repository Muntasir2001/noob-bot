const fs = require('fs');

const infoMessageEmbed = require('./infoMessageEmbed');

const getClientMember = async ({
	client,
	user,
	message,
	interaction,
	force,
}) => {
	try {
		const clientUser = await client.users
			.fetch(user, { force: force })
			.catch((err) => {
				if (message) {
					message.reply({
						embeds: [
							infoMessageEmbed(
								`:x: ${user} is an unknown user`,
								'ERROR',
							),
						],
					});
				} else {
					interaction.reply({
						embeds: [
							infoMessageEmbed(
								`:x: ${user} is an unknown user`,
								'ERROR',
							),
						],
					});
				}
				console.log(err);
			});

		return clientUser;
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in globalUtils/getClientMember.js \n Actual error: ${err} \n \n`,
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

module.exports = getClientMember;

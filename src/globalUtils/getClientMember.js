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
		console.log({
			message: 'something went wrong in global getClientMember.js',
			actualErr: err,
		});

		return;
	}
};

module.exports = getClientMember;

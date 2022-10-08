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
		console.log({
			message: 'something went wrong in legacy util getMember.js',
			actualErr: err,
		});

		return;
	}
};

module.exports = getMember;

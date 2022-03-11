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
					message.reply(`${user} is an unknown user`);
				} else {
					interaction.reply(`${user} is an unknown user`);
				}
				console.log(err);
			});

		return clientUser;
	} catch (errr) {
		return;
	}
};

module.exports = getClientMember;

const getClientMember = async (client, userID, message, force) => {
	try {
		const user = await client.users
			.fetch(userID, { force: force })
			.catch((err) => {
				message.channel.send(`${userID} is an unknown user`);
				console.log(err);
			});

		return user;
	} catch (errr) {
		return;
	}
};

module.exports = getClientMember;

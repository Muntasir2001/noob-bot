const getMember = async (client, userID, channel, force) => {
	try {
		const user = await client.users
			.fetch(userID, { force: force })
			.catch((err) => {
				channel.send(`${userID} is an unknown user`);
				console.log(err);
			});

		return user;
	} catch (errr) {
		return;
	}
};

module.exports = getMember;

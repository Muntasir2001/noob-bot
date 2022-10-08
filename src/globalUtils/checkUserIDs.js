const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;

const checkUserIds = (command) => {
	try {
		const adminUserIDsArray = ADMIN_USER_IDS.split(' ');
		let isFoundMatch = false;

		adminUserIDsArray.find((userID) => {
			if (command.member.id == userID) {
				isFoundMatch = true;

				return true;
			}
		});

		return isFoundMatch;
	} catch (err) {
		console.log(err);
		return false;
	}
};

module.exports = checkUserIds;

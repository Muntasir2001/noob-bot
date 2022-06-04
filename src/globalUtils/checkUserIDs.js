const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;

const checkUserIds = (message) => {
	const adminUserIDsArray = ADMIN_USER_IDS.split(' ');
	let isFoundMatch = false;

	adminUserIDsArray.forEach((userID) => {
		if (message.member.id == userID) {
			isFoundMatch = true;
		}
	});

	return isFoundMatch;
};

module.exports = checkUserIds;

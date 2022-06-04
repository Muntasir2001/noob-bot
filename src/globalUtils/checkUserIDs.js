const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;

const checkUserIds = (command) => {
	const adminUserIDsArray = ADMIN_USER_IDS.split(' ');
	let isFoundMatch = false;

	adminUserIDsArray.forEach((userID) => {
		if (command.member.id == userID) {
			isFoundMatch = true;
		}
	});

	return isFoundMatch;
};

module.exports = checkUserIds;

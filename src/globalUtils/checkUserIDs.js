const fs = require('fs');

const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;

const checkUserIds = (message) => {
	try {
		const adminUserIDsArray = ADMIN_USER_IDS.split(' ');

		if (adminUserIDsArray.indexOf(message.member.id !== -1)) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in globalUtils/checkUserIDs.js \n Actual error: ${err} \n \n`,
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

module.exports = checkUserIds;

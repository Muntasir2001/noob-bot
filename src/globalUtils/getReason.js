const fs = require('fs');

const getReason = (args, numItemsToRemove = 1) => {
	try {
		let tempArgs = args;

		tempArgs.splice(0, numItemsToRemove);

		return tempArgs.join(' ');
	} catch {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in globalUtils/getReason.js \n Actual error: ${err} \n \n`,
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

module.exports = getReason;

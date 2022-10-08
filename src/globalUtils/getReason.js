const getReason = (args, numItemsToRemove = 1) => {
	try {
		let tempArgs = args;

		tempArgs.splice(0, numItemsToRemove);

		return tempArgs.join(' ');
	} catch {
		console.log({
			message: 'something went wrong in global getReason.js',
			actualErr: err,
		});
	}
};

module.exports = getReason;

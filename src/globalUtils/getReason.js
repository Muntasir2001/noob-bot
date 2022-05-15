const getReason = (args, numItemsToRemove = 1) => {
	let tempArgs = args;

	tempArgs.splice(0, numItemsToRemove);

	return tempArgs.join(' ');
};

module.exports = getReason;

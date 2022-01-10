const getReason = (args) => {
	let tempArgs = args;

	tempArgs.splice(0, 1);

	return tempArgs.join(' ');
};

module.exports = getReason;

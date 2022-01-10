const getReason = (args) => {
	args.splice(0, 1);

	return args.join(' ');
};

module.exports = getReason;

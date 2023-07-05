const roleIds = {
	MOD_ROLE:
		process.env.MODE === 'DEV' ? '823812164782784562' : '823812164782784562',
	ETOURNE:
		process.env.MODE === 'DEV'
			? '1105865589374861513'
			: '1105865589374861513',
};

export default roleIds;

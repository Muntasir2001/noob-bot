const roleIds = (): { MOD_ROLE: string; ETOURNE: string } => {
	const DEV = {
		MOD_ROLE: '823812164782784562',
		ETOURNE: '1105865589374861513',
	};

	const PROD = {
		MOD_ROLE: '823812164782784562',
		ETOURNE: '1105865589374861513',
	};

	if (process.env.MODE === 'DEV') {
		return DEV;
	} else {
		return PROD;
	}
};

export default roleIds;

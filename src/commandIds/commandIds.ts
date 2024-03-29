const commandIds = {
	HELP:
		process.env.MODE === 'DEV' ? '1121851980164386826' : '912108220917612596',
	KICK:
		process.env.MODE === 'DEV' ? '1121047119072067605' : '912309487413637120',
	WARN:
		process.env.MODE === 'DEV'
			? '1125838943779307631'
			: '1028216253338357760',
	BAN:
		process.env.MODE === 'DEV' ? '1121047118577147907' : '912309488164433970',
	TIMEOUT:
		process.env.MODE === 'DEV' ? '1121047119072067608' : '951799116797718550',
	PURGE:
		process.env.MODE === 'DEV'
			? '1121047119072067607'
			: '1126163379225112606',
	SERVER_INFO:
		process.env.MODE === 'DEV' ? '1121478569583988816' : '912309572339920906',
	BOT_INFO:
		process.env.MODE === 'DEV' ? '1121047118577147906' : '912309659019382794',
	USER_INFO:
		process.env.MODE === 'DEV' ? '1121486667165999204' : '912309488927785000',
	AVATAR:
		process.env.MODE === 'DEV' ? '1121474025030422608' : '951451554509119558',
};

export default commandIds;

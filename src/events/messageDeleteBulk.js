require('dotenv').config();

const messageDeleteBulkLogger = require('../logger/messageDeleteBulkLogger');

const messageDeleteBulk = async (messages, client) => {
	const first = messages.first();
	const channel = first.channel;
	const guild = first.guild;

	const auditLog = await guild.fetchAuditLogs();
	const action = auditLog.entries.first();
	const logChannelId = process.env.LOG_CHANNEL_ID;

	let amount = messages.size;
	let executor = action.executor;

	messageDeleteBulkLogger(
		executor,
		guild,
		logChannelId,
		client,
		amount,
		channel,
	);
};

module.exports = messageDeleteBulk;

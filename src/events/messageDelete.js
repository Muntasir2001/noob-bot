require('dotenv').config();

const messageDeleteLogger = require('../logger/messageDeleteLogger');

const messageDelete = async (message, client) => {
	const guild = message.guild;

	const auditLog = await guild.fetchAuditLogs();
	const action = auditLog.entries.first();
	const logChannelId = process.env.LOG_CHANNEL_ID;

	let executor = action.executor;
	let target = action.target;

	messageDeleteLogger(message, executor, target, guild, logChannelId, client);
};

module.exports = messageDelete;

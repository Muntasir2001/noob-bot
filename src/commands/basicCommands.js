const PREFIX = process.env.PREFIX;
const { WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient(
	process.env.WEBHOOK_ID,
	process.env.WEBHOOK_TOKEN,
);

const generalMssg = (message, CMD_NAME) => {
	if (CMD_NAME === 'nou') {
		message.reply('no u');
	}

	if (CMD_NAME === 'announce') {
		const mssg = args.join(' ');
		webhookClient.send(mssg);
	}
};

module.exports = generalMssg;

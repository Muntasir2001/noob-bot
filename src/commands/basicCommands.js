const PREFIX = process.env.PREFIX;
// const { WebhookClient } = require('discord.js');

// const webhookClient = new WebhookClient(
// 	process.env.WEBHOOK_ID,
// 	process.env.WEBHOOK_TOKEN,
// );

const generalMssg = (message, CMD_NAME, args) => {
	if (CMD_NAME === 'nou') {
		if (args.length !== 0) {
			const member = message.mentions.members.first();
			message.channel.send(`no u ${member}`);
		} else {
			message.channel.send(`no u`);
		}
	}

	// if (CMD_NAME === 'announce') {
	// 	const mssg = args.join(' ');
	// 	webhookClient.send(mssg);
	// }
};

module.exports = generalMssg;

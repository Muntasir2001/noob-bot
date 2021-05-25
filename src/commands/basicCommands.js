const PREFIX = process.env.PREFIX;
const { WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient(
	process.env.WEBHOOK_ID,
	process.env.WEBHOOK_TOKEN,
);

const generalMssg = (message) => {
	//if the message author is not the bot itself and if the message starts with the prefix
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME === 'hello') {
			message.channel.send('hello there');
		}

		if (CMD_NAME === 'bye') {
			message.channel.send('Bye! :)');
		}

		if (CMD_NAME === 'announce') {
			const mssg = args.join(' ');
			webhookClient.send(mssg);
		}
	}
};

module.exports = generalMssg;

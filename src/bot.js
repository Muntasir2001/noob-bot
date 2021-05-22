require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');
const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
});

const webhookClient = new WebhookClient(
	process.env.WEBHOOK_ID,
	process.env.WEBHOOK_TOKEN,
);

const PREFIX = '--';

client.on('ready', () => {
	console.log(`${client.user.tag} has logged in`);
});

//message event listener - when anyone types a message/certain command in the text chat
client.on('message', (message) => {
	console.log(`${message.author.tag}: ${message.content}`);

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

		//kicking people out
		if (CMD_NAME === 'kick') {
			if (!message.member.hasPermission('KICK_MEMBERS')) {
				return message.reply(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				);
			}
			if (args.length === 0) return message.reply('please provide an ID');

			const member = message.guild.members.cache.get(args[0]);

			if (member) {
				member
					.kick()
					.then((member) => {
						message.channel.send(
							`${member} was kicked out of the server :3`,
						);
					})
					.catch((err) =>
						message.channel.send(
							'Welp, I do not have the permissions ;-;',
						),
					);
			} else {
				message.reply('Welp, member is not in the server :/');
			}
			//banning people
		} else if (CMD_NAME === 'ban') {
			if (!message.member.hasPermission('KICK_MEMBERS'))
				return message.reply(
					'HEY HEY HEY there, I see what you trynna do there :eyes:',
				);

			if (args.length === 0) return message.reply('please provide an ID');

			message.guild.members
				.ban(args[0])
				.then((member) => {
					`${member} is banned from this server :3`;
				})
				.catch((err) => {
					message.channel.send('Welp, I do not have the permissions ;-;');
				});

			//using webhook to send message
		} else if (CMD_NAME === 'announce') {
			const mssg = args.join(' ');
			webhookClient.send(mssg);
		}
	}
});

//add reaction roles
client.on('messageReactionAdd', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.add('845297466521813043');
				break;

			case '💻':
				member.roles.add('845297666069233735');
				break;
		}
	}
});

//remove roles with reactions
client.on('messageReactionRemove', (reaction, user) => {
	const { name } = reaction.emoji;
	const member = reaction.message.guild.members.cache.get(user.id);
	if (reaction.message.id === '845261229776830464') {
		switch (name) {
			case '🖥️':
				member.roles.remove('845297466521813043');
				break;

			case '💻':
				member.roles.remove('845297666069233735');
				break;
		}
	}
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

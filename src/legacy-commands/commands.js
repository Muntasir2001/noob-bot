const PREFIX = process.env.PREFIX;
const Discord = require('discord.js');

const hello = require('./commands/hello');
const bye = require('./commands/bye');
const ban = require('./commands/ban');
const kick = require('./commands/kick');
const clearMessages = require('./commands/clearMessages');
const help = require('./commands/help');
const setStatus = require('./commands/setStatus');
const serverInfo = require('./commands/serverInfo');
const goodMorning = require('./commands/goodMorning');
const goodNight = require('./commands/goodNight');
const botInfo = require('./commands/botInfo');
const basicCommands = require('./commands/basicCommands');
const userInfo = require('./commands/userInfo');

const cmds = {
	hello,
	bye,
	ban,
	kick,
	clear: clearMessages,
	help,
	serverinfo: serverInfo,
	setstatus: setStatus,
	gm: goodMorning,
	gn: goodNight,
	botinfo: botInfo,
	nou: basicCommands,
	userinfo: userInfo,
};

const commands = (message, client) => {
	if (!message.author.bot && message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/); //this is a regular expression which eliminates multiple whitespaces in the command

		if (CMD_NAME in cmds) {
			cmds[CMD_NAME](message, CMD_NAME, args, client);
		} else {
			message.channel.send(':x: Wrong Command :x:');
		}
	}
};

module.exports = commands;

/* this will import all the slash commands and make a json object and export it to slashCommandHandler */
const ping = require('./commands/ping');
const add = require('./commands/add');
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const userInfo = require('./commands/userInfo');
const serverInfo = require('./commands/serverInfo');
const goodMorning = require('./commands/goodMorning');
const goodNight = require('./commands/goodNight');
const hello = require('./commands/hello');
const bye = require('./commands/bye');
const noYou = require('./commands/noYou');
const botInfo = require('./commands/botInfo');
const help = require('./commands/help');

const slashCommands = {
	ping,
	add,
	kick,
	ban,
	userinfo: userInfo,
	serverinfo: serverInfo,
	gm: goodMorning,
	gn: goodNight,
	hello,
	nou: noYou,
	botinfo: botInfo,
	help,
	bye,
};

module.exports = slashCommands;

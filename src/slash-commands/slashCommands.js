/* this will import all the slash commands and make a json object and export it to slashCommandHandler */
const ping = require('./commands/ping');
const add = require('./commands/add');
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const userInfo = require('./commands/userInfo');
const serverInfo = require('./commands/serverInfo');

const slashCommands = {
	ping,
	add,
	kick,
	ban,
	userinfo: userInfo,
	serverinfo: serverInfo,
};

module.exports = slashCommands;

/* this will import all the slash commands and make a json object and export it to slashCommandHandler */
const ping = require('./commands/ping');
const add = require('./commands/add');
const kick = require('./commands/kick');

const slashCommands = {
	ping,
	add,
	kick,
};

module.exports = slashCommands;

/* this will import all the slash commands and make a json object and export it to slashCommandHandler */
const ping = require('./commands/ping');

// const slashCommands = () => {
// 	return {
// 		ping: ping,
// 	};
// };

const slashCommands = {
	ping: ping,
};

module.exports = slashCommands;

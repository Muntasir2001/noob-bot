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
const warn = require('./commands/warn');
const salam = require('./commands/salam');
const avatar = require('./commands/avatar');

const legacyCommands = {
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
   warn,
   salam,
   avatar,
};

module.exports = legacyCommands;

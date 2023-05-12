const verifyUser = require('./buttonFunctions/verifyUser');
const closeWarnChannel = require('./buttonFunctions/closeWarnChannel');
const closeVerifyTicket = require('./buttonFunctions/closeVerifyTicket');
const etourne = require('./buttonFunctions/etourne');

const buttonList = {
	verifyUser,
	closeWarnChannel,
	closeVerifyTicket,
	etourne,
};

module.exports = buttonList;

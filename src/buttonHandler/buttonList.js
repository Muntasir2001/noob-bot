const verifyUser = require('./buttonFunctions/verifyUser');
const closeWarnChannel = require('./buttonFunctions/closeWarnChannel');
const closeVerifyTicket = require('./buttonFunctions/closeVerifyTicket');

const buttonList = {
	verifyUser,
	closeWarnChannel,
	closeVerifyTicket,
};

module.exports = buttonList;

const verifyUser = require('./buttonFunctions/verifyUser');
const closeWarnChannel = require('./buttonFunctions/closeWarnChannel');
const closeVerifyTicket = require('./buttonFunctions/closeTicket');
const etourne = require('./buttonFunctions/etourne');
const aboutMe = require('./buttonFunctions/aboutMe');

const buttonList = {
	verifyUser,
	closeWarnChannel,
	closeVerifyTicket,
	etourne,
	aboutMe,
};

module.exports = buttonList;

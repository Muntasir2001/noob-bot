const buttonList = require('./buttonList');

const buttonHandler = async (interaction, client) => {
	const { customId } = interaction;

	if (customId in buttonList) {
		buttonList[customId](interaction, client);
	}
};

module.exports = buttonHandler;

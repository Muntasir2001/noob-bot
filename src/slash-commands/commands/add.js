const add = (interaction, CMD_NAME, options) => {
	const num1 = options.getNumber('num1');
	const num2 = options.getNumber('num2');
	interaction.reply({
		content: `The sum is ${num1 + num2}`,
		ephemeral: false,
	});
};

module.exports = add;

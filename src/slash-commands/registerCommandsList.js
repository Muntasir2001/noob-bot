const { Constants } = require('discord.js');

const commandsList = [
	{
		name: 'ping',
		description: 'Replies with pong',
		options: [],
	},
	{
		name: 'add',
		description: 'Add two numbers',
		options: [
			{
				name: 'num1',
				description: 'The first number',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.NUMBER,
			},
			{
				name: 'num2',
				description: 'The second number',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.NUMBER,
			},
		],
	},
];

module.exports = commandsList;

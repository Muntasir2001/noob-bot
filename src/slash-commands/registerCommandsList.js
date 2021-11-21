/* this is slashCommandsList and its for registerCommands to use and register them */

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
	{
		name: 'kick',
		description: 'kick member from the server',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
			{
				name: 'reason',
				description: 'reason for kick',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING,
			},
		],
	},
	{
		name: 'ban',
		description: 'ban member from the server',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
			{
				name: 'reason',
				description: 'reason for ban',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING,
			},
			{
				name: 'days',
				description: 'how many days of message to delete',
				required: false,
				type: Constants.ApplicationCommandOptionTypes.NUMBER,
			},
		],
	},
	{
		name: 'userinfo',
		description: 'get userinfo of a member',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				// required: false,
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
];

module.exports = commandsList;

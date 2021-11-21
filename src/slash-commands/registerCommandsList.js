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
		description: 'Kick member from the server',
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
		description: 'Ban member from the server',
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
		description: 'Get userinfo of a member',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				// required: false,
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'serverinfo',
		description: 'Get serverinfo',
		options: [],
	},
	{
		name: 'goodmorning',
		description: 'Replies with goodmorning',
		options: [],
	},
	{
		name: 'goodnight',
		description: 'Replies with goodnight',
		options: [],
	},
];

module.exports = commandsList;

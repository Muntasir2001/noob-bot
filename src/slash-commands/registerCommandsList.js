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
		name: 'gm',
		description: 'Replies with goodmorning',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'gn',
		description: 'Replies with goodnight',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'hello',
		description: 'Replies with hello',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'bye',
		description: 'Replies with bye',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'nou',
		description: 'Say no you to an user or in general',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'botinfo',
		description: 'Get botinfo',
		options: [],
	},
	{
		name: 'help',
		description: 'Get list of all the commands',
		options: [],
	},
	{
		name: 'clear',
		description: 'Delete messages',
		options: [
			{
				name: 'number',
				description: 'number of messages to delete',
				type: Constants.ApplicationCommandOptionTypes.NUMBER,
			},
		],
	},
	{
		name: 'salam',
		description: 'Replies with Waalaikumassalam Warahmatullahi Wabarakatuhu',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
	{
		name: 'movemssg',
		description: 'Moves a range of messages to another channel',
		options: [
			{
				name: 'to_channel',
				description: 'Channel you want to move messages to',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.CHANNEL,
			},
			{
				name: 'start_message_id',
				description: 'Message ID for the starting message',
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING,
			},
			{
				name: 'end_message_id',
				description:
					'Message ID for the ending message (creates a range). Leave blank to only move the starting message.',
				type: Constants.ApplicationCommandOptionTypes.STRING,
			},
		],
	},
	{
		name: 'avatar',
		description: 'Display avatar of an user',
		options: [
			{
				name: 'user',
				description: 'tag the user',
				type: Constants.ApplicationCommandOptionTypes.USER,
			},
		],
	},
];

module.exports = commandsList;

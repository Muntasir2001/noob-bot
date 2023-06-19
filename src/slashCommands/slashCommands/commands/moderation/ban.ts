import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import logFile from '../../utilities/logFile';
import { Command } from '../../Command';

const ban: Command = {
	name: 'ban',
	description: 'Ban member from the server',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: true,
			type: 'USER',
		},
		{
			name: 'reason',
			description: 'reason for ban',
			required: true,
			type: 'STRING',
		},
		{
			name: 'days',
			description: 'how many days of message to delete',
			required: false,
			type: 'NUMBER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
		} catch (err) {
			logFile({
				error: err,
				folder: 'slashCommands/moderation',
				file: 'ban',
			});
		}
	},
};

export default ban;

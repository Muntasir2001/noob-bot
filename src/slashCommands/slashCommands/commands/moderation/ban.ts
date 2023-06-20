import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import logFile from '../../utilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../../globalUtilities/infoMessageEmbed';

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
			description: 'how many days of message to delete (defaults to 0)',
			required: false,
			type: 'NUMBER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user = interaction.options.get('user');
			const reason = interaction.options.get('reason');
			const days = interaction.options.get('days');

			if (!interaction.memberPermissions?.has('BAN_MEMBERS')) {
				return interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: 'You are not allowed to run this command!',
							type: types.ERROR,
						}),
					],
					ephemeral: false,
				});
			}
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

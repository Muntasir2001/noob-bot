import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js';

import logFile from '../../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../../globalUtilities/infoMessageEmbed';

const timeout: Command = {
	name: 'timeout',
	description: 'Timeout a member in the server',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: true,
			type: 'USER',
		},
		{
			name: 'reason',
			description: 'reason for timeout',
			required: true,
			type: 'STRING',
		},
		{
			name: 'time',
			description: 'length of timeout in minutes',
			required: true,
			type: 'NUMBER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const reason: any = interaction.options.get('reason')!;

			if (!interaction.memberPermissions?.has('MODERATE_MEMBERS')) {
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

			const target = await interaction
				.guild!.members.fetch({ user: user })
				.catch((err) => {
					throw err;
				});

			if (!target.moderatable) {
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
			await interaction.reply({
				embeds: [
					infoMessageEmbed({
						title: ':x: Command failed to execute',
						type: types.ERROR,
					}),
				],
				ephemeral: true,
			});

			logFile({
				error: err,
				folder: 'slashCommands/moderation',
				file: 'timeout',
			});
		}
	},
};

export default timeout;

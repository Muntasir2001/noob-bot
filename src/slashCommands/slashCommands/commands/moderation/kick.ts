import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js';

import logFile from '../../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../../globalUtilities/infoMessageEmbed';

const kick: Command = {
	name: 'ban',
	description: 'Kick member from the server',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: true,
			type: 'USER',
		},
		{
			name: 'reason',
			description: 'reason for kick',
			required: true,
			type: 'STRING',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const reason: any = interaction.options.get('reason')!;

			if (!interaction.memberPermissions?.has('KICK_MEMBERS')) {
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

			/* if user kickable */
			if (!target.kickable) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':x: User not kickable!',
							type: types.ERROR,
						}),
					],
					ephemeral: true,
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
				file: 'ban',
			});
		}
	},
};

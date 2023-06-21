import {
	BaseCommandInteraction,
	Client,
	GuildMember,
	MessageEmbed,
	User,
} from 'discord.js';

import logFile from '../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';

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
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const member = interaction.options.getMember('user')!; // testing
			const reason: any = interaction.options.get('reason')!;

			if (!interaction.memberPermissions?.has('BAN_MEMBERS')) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':warning: You are not allowed to run this command!',
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

			/* if user bannable */
			if (!target.bannable) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':x: User not bannable!',
							type: types.ERROR,
						}),
					],
					ephemeral: true,
				});
			}

			await target
				.ban({ reason: reason.value })
				.then(async () => {
					const banEmbed = new MessageEmbed()
						.setColor(botConfig.color.default)
						.setTitle(`:no_entry: Banned ${target.user.tag}`)
						.addFields(
							{
								name: 'Moderator',
								value: `${interaction.member!.user}`,
							},
							{
								name: 'Banned user',
								value: `${user}`,
							},
							{
								name: 'Reason',
								value: reason,
							},
						)
						.setTimestamp()
						.setFooter({ text: `Member ID: ${target.user.id}` });

					return await interaction.reply({
						embeds: [banEmbed],
						ephemeral: false,
					});
				})
				.catch((err) => {
					throw err;
				});
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

export default ban;

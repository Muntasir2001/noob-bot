import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js';

import logFile from '../../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../../botConfig';

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
			const time: any = interaction.options.get('time')!;

			if (!interaction.memberPermissions?.has('MODERATE_MEMBERS')) {
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

			if (!target.moderatable) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':x: User cannot be timeout out!',
							type: types.ERROR,
						}),
					],
					ephemeral: false,
				});
			}

			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(`:alarm_clock: Timed out ${target.user.tag}`)
				.addFields(
					{
						name: 'Moderator',
						value: `${interaction.member?.user}`,
					},
					{
						name: 'Timed out user',
						value: `<@${target.id}>`,
					},
					{
						name: 'Timeout length',
						value:
							time.value === 1
								? `${time.value} minute`
								: `${time} minutes`,
					},
					{
						name: 'Reason',
						value: reason,
					},
				)
				.setTimestamp()
				.setFooter({ text: `Member ID: ${target.id}` });

			await target
				.timeout(time * 1000 * 60, reason)
				.then(async () => {
					return await interaction.reply({
						embeds: [embed],
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
				file: 'timeout',
			});
		}
	},
};

export default timeout;

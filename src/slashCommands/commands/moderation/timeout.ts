import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	User,
	TextBasedChannel,
} from 'discord.js';

import logFile from '../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';

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
			name: 'time',
			description: 'length of timeout in minutes',
			required: true,
			type: 'NUMBER',
		},
		{
			name: 'reason',
			description: 'reason for timeout',
			required: true,
			type: 'STRING',
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
							title: `:x: ${user.tag} cannot be timed out!`,
							type: types.ERROR,
						}),
					],
					ephemeral: false,
				});
			}

			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setThumbnail(user.displayAvatarURL())
				.setTitle(`:alarm_clock: Timed out ${user.tag}`)
				.addFields(
					{
						name: 'Moderator',
						value: `${interaction.member?.user}`,
					},
					{
						name: 'Timed out user',
						value: `<@${user.id}> (${user.tag})`,
					},
					{
						name: 'Timeout length',
						value:
							time.value === 1
								? `${time.value} minute`
								: `${time.value} minutes`,
					},
					{
						name: 'Reason',
						value: reason.value,
					},
				)
				.setTimestamp()
				.setFooter({ text: `Member ID: ${target.id}` });

			await target
				.timeout(time.value * 1000 * 60, reason)
				.then(async () => {
					const logChannel: TextBasedChannel | any =
						interaction.guild?.channels.resolve(
							process.env.LOG_CHANNEL_ID!,
						);

					if (logChannel) await logChannel.send({ embeds: [embed] });

					return await interaction.reply({
						embeds: [
							infoMessageEmbed({
								title: `:clock: ${user.tag} has been timed out for ${time.value} minutes`,
								type: types.SUCCESS,
							}),
						],
						ephemeral: true,
					});
				})
				.catch((err) => {
					throw err;
				});
		} catch (err) {
			await interaction.reply({
				embeds: [
					infoMessageEmbed({
						title: ':x: Something went wrong',
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

import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	User,
	TextBasedChannel,
	GuildMember,
} from 'discord.js';

import logFile from '../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';

const kick: Command = {
	name: 'kick',
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

			await target
				.kick(reason)
				.then(async () => {
					const kickEmbed = new MessageEmbed()
						.setColor(botConfig.color.default)
						.setTitle(`:boot: Kicked ${target.user.tag}`)
						.setThumbnail(user.displayAvatarURL())
						.addFields(
							{
								name: 'Moderator',
								value: `${interaction.member?.user}`,
							},
							{
								name: 'Kicked user',
								value: `${user} (${user.tag})`,
							},
							{
								name: 'Reason',
								value: reason.value,
							},
						)
						.setTimestamp()
						.setFooter({ text: `Member ID: ${target.user.id}` });

					const logChannel: TextBasedChannel | any =
						interaction.guild?.channels.resolve(
							process.env.LOG_CHANNEL_ID!,
						);

					if (logChannel) await logChannel.send({ embeds: [kickEmbed] });

					return await interaction.reply({
						embeds: [
							infoMessageEmbed({
								title: `:boot: ${user.tag} has been kicked`,
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
				file: 'kick',
			});
		}
	},
};

export default kick;

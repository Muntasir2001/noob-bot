import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	TextBasedChannel,
	User,
	Collection,
	Snowflake,
	Message,
} from 'discord.js';

import logFile from '../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';

const purge: Command = {
	name: 'purge',
	description: 'Purge messages',
	options: [
		{
			name: 'number',
			description: 'number of messages to purge',
			required: true,
			type: 'NUMBER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const number: any = interaction.options.get('number');

			let allDeletedMessages:
				| Collection<Snowflake, Message | undefined>
				| undefined;
			let deletedMessages: string = '>>> ';

			if (!interaction.memberPermissions?.has('MANAGE_MESSAGES')) {
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

			if (
				interaction.channel?.isText() &&
				!(interaction.channel.type === 'DM')
			) {
				await interaction.channel
					?.bulkDelete(number?.value, true)
					.then((m: any) => {
						allDeletedMessages = m;
					});
			}

			allDeletedMessages!.forEach((message: any) => {
				deletedMessages += `${message.author.tag}: ${message.content} \n`;
			});

			const logChannel: TextBasedChannel | any =
				interaction.guild?.channels.resolve(process.env.LOG_CHANNEL_ID!);

			if (!logChannel) return;

			const logEmbed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(`Purged ${allDeletedMessages!.size} messages`)
				.addFields(
					{
						name: 'Moderator',
						value: `${interaction.member!.user}`,
					},
					{
						name: 'Channel',
						value: `<#${interaction.channel?.id}>`,
					},
					{
						name: 'Messages purged',
						value: deletedMessages,
					},
				)
				.setFooter({ text: interaction.guild!.name })
				.setTimestamp();

			logChannel.send({ embeds: [logEmbed] });

			return await interaction.reply({
				embeds: [
					infoMessageEmbed({
						title: `:white_check_mark: Deleted ${
							allDeletedMessages!.size
						} messages`,
						type: types.SUCCESS,
					}),
				],
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
				file: 'purge',
			});
		}
	},
};

export default purge;

import {
	Client,
	ButtonInteraction,
	MessageActionRow,
	MessageButton,
} from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import isChannelCategoryExists from '../../globalUtilities/isChannelCategoryExists';
import getChannelCategoryId from '../../globalUtilities/getChannelCategoryId';
import roleIds from '../../roleIds/roleIds';

const verifyUser: Button = {
	customId: 'verifyUser',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const guildId = process.env.GUILD_ID;

			const guild = guildId
				? client.guilds.cache.get(guildId)
				: client.guilds.cache.get(interaction.guild!.id);

			if (
				await isChannelCategoryExists({
					guild: guild!,
					categoryName: 'Verify',
				})
			) {
				const categoryId = await getChannelCategoryId({
					guild: guild!,
					categoryName: 'Verify',
				});
				const resolvedCategory: any = guild!.channels.resolve(categoryId);

				const verifyChannelCreate = resolvedCategory.createChannel(
					`verify-${interaction.user.username}`,
					{
						type: 'GUILD_TEXT',
						topic: `Verify ${interaction.user.id}`,
						reason: `Verify ${interaction.user.id}`,
						permissionOverwrites: [
							{
								id: guild!.roles.everyone,
								deny: ['VIEW_CHANNEL'],
							},
							{
								id: await guild!.roles.fetch(roleIds.MOD_ROLE),
								allow: [
									'VIEW_CHANNEL',
									'SEND_MESSAGES',
									'ATTACH_FILES',
									'EMBED_LINKS',
									'READ_MESSAGE_HISTORY',
								],
							},
							{
								id: interaction.user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
							},
						],
					},
				);

				let verifyChannel: any;

				await verifyChannelCreate.then((data: any) => {
					verifyChannel = data;
				});

				const buttons = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId('closeTicket')
						.setLabel('Close ticket')
						.setStyle('DANGER'),
				);

				verifyChannel.send({
					content: `<@${interaction.user.id}>`,
					embeds: [
						infoMessageEmbed({
							title: 'Please wait until one of the moderators verifies you.',
						}),
					],
					components: [buttons],
				});

				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: `${verifyChannel} was created, please go there to get verified.`,
						}),
					],
					ephemeral: true,
				});
			} else {
				const verifyChannelCreate = guild!.channels.create(
					`verify-${interaction.user.username}`,
					{
						type: 'GUILD_TEXT',
						topic: `Verify ${interaction.user.id}`,
						reason: `Verify ${interaction.user.id}`,
						permissionOverwrites: [
							{
								id: guild!.roles.everyone,
								deny: ['VIEW_CHANNEL'],
							},
							{
								id: roleIds.MOD_ROLE,
								allow: [
									'VIEW_CHANNEL',
									'SEND_MESSAGES',
									'ATTACH_FILES',
									'EMBED_LINKS',
									'READ_MESSAGE_HISTORY',
								],
							},
							{
								id: interaction.user.id,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
							},
						],
					},
				);

				let verifyChannel: any;

				await verifyChannelCreate.then((data: any) => {
					verifyChannel = data;
				});

				const buttons = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId('closeTicket')
						.setLabel('Close ticket')
						.setStyle('DANGER'),
				);

				verifyChannel.send({
					content: `<@${interaction.user.id}>`,
					embeds: [
						infoMessageEmbed({
							title: 'Please wait until one of the moderators verifies you.',
						}),
					],
					components: [buttons],
				});

				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: `${verifyChannel} was created, please go there to get verified.`,
						}),
					],
					ephemeral: true,
				});
			}
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
				folder: 'buttonHandler',
				file: 'verifyUser',
			});
		}
	},
};

export default verifyUser;

import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	User,
	TextBasedChannel,
	GuildMemberRoleManager,
} from 'discord.js';

import logFile from '../../../globalUtilities/logFile';
import { Command } from '../../Command';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';
import roleIds from '../../../roleIds/roleIds';

const warn: Command = {
	name: 'warn',
	description: 'Warn a user',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: true,
			type: 'USER',
		},
		{
			name: 'reason',
			description: 'reason for the warning',
			required: true,
			type: 'STRING',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const reason: any = interaction.options.get('reason')!;

			const roles = (interaction.member!.roles as GuildMemberRoleManager)
				.cache;

			if (
				!interaction.memberPermissions!.has('KICK_MEMBERS') &&
				!roles.some((role) => role.id === roleIds().MOD_ROLE)
			) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':warning: You are not allowed to use this button!',
							type: types.ERROR,
						}),
					],
				});
			}

			const guildId = process.env.GUILD_ID;
			const guild = guildId
				? client.guilds.cache.get(guildId)
				: client.guilds.cache.get(interaction.guild!.id);

			let warningChannelId;
			let warningChannel;

			const warnGuild = guild!.channels.create(`Warning-${user.tag}`, {
				type: 'GUILD_TEXT',
				topic: `Warning to ${user}`,
				reason: `${interaction.member!.user} has warned ${user}`,
				permissionOverwrites: [
					{
						id: guild!.roles.everyone,
						deny: ['VIEW_CHANNEL'],
					},
					{
						id: roleIds().MOD_ROLE,
						allow: [
							'VIEW_CHANNEL',
							'SEND_MESSAGES',
							'ATTACH_FILES',
							'EMBED_LINKS',
							'READ_MESSAGE_HISTORY',
						],
					},
					{
						id: user.id,
						allow: ['VIEW_CHANNEL'],
						deny: ['SEND_MESSAGES'],
					},
				],
			});

			await warnGuild.then((data) => {
				warningChannel = data;
				warningChannelId = data.id;
			});

			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(`:warning: Warned ${user.tag}`)
				.addFields([
					{
						name: 'Moderator',
						value: `${interaction.member!.user}`,
					},
					{
						name: 'Reason',
						value: `${reason}`,
					},
					{
						name: 'Warning Channel',
						value: `<#${warningChannelId}>`,
					},
				])
				.setTimestamp()
				.setFooter({ text: `Member ID: ${user.id}` });

			const warningMessageEmbed = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle(`:warning: You have received a warning`)
				.addFields([
					{
						name: 'Reason',
						value: `${reason}`,
					},
				])
				.setTimestamp()
				.setFooter({
					text: `Reach out to mods if you have any question`,
				});

			await warningChannel!.send({
				content: `<@${user.id}>`,
				embeds: [warningMessageEmbed],
				// components: [button],
			});

			return await interaction.reply({
				embeds: [embed],
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
				file: 'warn',
			});
		}
	},
};

export default warn;

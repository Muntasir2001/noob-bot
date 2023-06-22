import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js';

import logFile from '../../globalUtilities/logFile';
import { Command } from '../Command';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';

const userInfo: Command = {
	name: 'userinfo',
	description: 'Get information of an user',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: false,
			type: 'USER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const member = user
				? interaction.guild!.members.cache.get(user.id)
				: interaction.guild!.members.cache.get(interaction.user.id);

			let roles = member!.roles.cache
				.map((r) => r)
				.join(' ')
				.replace('@everyone', ' ');
			roles = roles.length > 1 ? roles : 'No Roles';

			const userInfoEmbed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(`Information about ${member!.user.username}`)
				.setAuthor({
					name: `${member!.user.username}` || 'None',
					iconURL: `${member!.user.displayAvatarURL()}` || 'None',
				})
				.setThumbnail(`${member!.user.displayAvatarURL()}` || 'None')
				.addFields(
					{
						name: 'User tag',
						value: member!.user.tag || 'None',
						inline: true,
					},
					{ name: '\u200B', value: '\u200B', inline: true },
					{
						name: 'Nickname',
						value: member!.nickname || 'None',
						inline: true,
					},
					{
						name: 'Account created',
						value:
							`<t:${Math.floor(
								member!.user.createdTimestamp / 1000,
							)}:F>` || 'None',
						inline: true,
					},
					{ name: '\u200B', value: '\u200B', inline: true },
					{
						name: 'Joined the server',
						value:
							`<t:${Math.floor(
								member!.guild!.joinedTimestamp / 1000,
							)}:F>` || 'None',
						inline: true,
					},
					{
						name: 'Roles',
						value: `${roles}` || 'None',
					},
					{
						name: 'User ID',
						value: `\`${member!.user.id}\``,
					},
				)
				.setTimestamp()
				.setFooter({
					text: `Requested by: ${interaction.user.tag}`,
					iconURL: interaction.user.displayAvatarURL(),
				});

			return await interaction.reply({
				embeds: [userInfoEmbed],
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
				folder: 'slashCommands',
				file: 'userInfo',
			});
		}
	},
};

export default userInfo;

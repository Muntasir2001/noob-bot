import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import logFile from '../../globalUtilities/logFile';
import { Command } from '../Command';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';

const serverInfo: Command = {
	name: 'serverinfo',
	description: 'Get server information',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const { guild } = interaction;

			const { name, memberCount, roles, ownerId, createdTimestamp } = guild!;

			const infoEmbed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(name)
				.setDescription(`Info about ${name}`)
				.setThumbnail(guild!.iconURL()!)
				.addFields(
					// { name: '\u200B', value: '\u200B' },
					{
						name: 'Server Owner',
						value: `<@${ownerId}>`,
						inline: true,
					},
					{
						name: 'Role count',
						value: roles.cache.size.toString(),
						inline: true,
					},
					{
						name: 'Number of Members',
						value: memberCount.toString(),
						inline: true,
					},
					{
						name: 'Server created',
						value: new Date(createdTimestamp).toLocaleString() + ' GMT',
						inline: false,
					},
				)
				.setFooter({ text: `Requested by: ${interaction.user.tag}` })
				.setTimestamp();

			return await interaction.reply({
				embeds: [infoEmbed],
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
				file: 'serverInfo',
			});
		}
	},
};

export default serverInfo;

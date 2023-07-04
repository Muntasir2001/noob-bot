import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import { Command } from '../Command';
import formatProcessUptime from '../utilities/formatProcessUptime';
import botConfig from '../../botConfig';
import logFile from '../../globalUtilities/logFile';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';

const botInfo: Command = {
	name: 'botinfo',
	description: 'Information about the bot',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const botInfoEmbed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setThumbnail(client.user!.displayAvatarURL())
				.setAuthor({
					name: `${client.user!.username}`,
					iconURL: `${client.user!.displayAvatarURL()}`,
				})
				.addFields(
					{ name: 'Bot Tag', value: `${client.user!.tag}` },
					{ name: 'Bot version', value: `1.0-beta` },
				)
				.setFooter({
					text: `Requested by: ${interaction.user.tag}`,
					iconURL: interaction.user.displayAvatarURL(),
				})
				.setTimestamp();

			if (interaction.user.id === process.env.OWNER_ID) {
				botInfoEmbed.addFields([
					{
						name: 'Time elapsed since last restart',
						value: `${formatProcessUptime({
							uptime: process.uptime(),
						})}`,
					},
				]);
			}

			await interaction.reply({
				embeds: [botInfoEmbed],
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
				file: 'avatar',
			});
		}
	},
};

export default botInfo;

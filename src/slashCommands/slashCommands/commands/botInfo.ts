import fs from 'fs';

import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import { Command } from '../Command';
import formatProcessUptime from '../utilities/formatProcessUptime';

const botInfo: Command = {
	name: 'botinfo',
	description: 'Information about the bot',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const botInfoEmbed = new MessageEmbed()
				.setColor('#ff4454')
				.setThumbnail(client.user!.displayAvatarURL())
				.setAuthor({
					name: `${client.user!.username}`,
					iconURL: `${client.user!.displayAvatarURL()}`,
				})
				.addFields(
					{ name: 'Bot Tag', value: `${client.user!.tag}` },
					{ name: 'Bot version', value: `1.0-beta` },
				)
				.setFooter({ text: client.user!.tag })
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
			try {
				fs.appendFile(
					'logs/crash_logs.txt',
					`${new Date()} : Something went wrong in slashcommands/botInfo.ts \n Actual error: ${err} \n \n`,
					(err) => {
						if (err) throw err;
					},
				);
			} catch (err) {
				console.log('Error logging failed');
			}
		}
	},
};

export default botInfo;

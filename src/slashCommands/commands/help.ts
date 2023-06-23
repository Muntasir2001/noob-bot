import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import logFile from '../../globalUtilities/logFile';
import { Command } from '../Command';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';
import PROD from '../../commandIds/PROD.json';
import DEV from '../../commandIds/DEV.json';

const help: Command = {
	name: 'help',
	description: 'Get list of all the commands',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle(`${client.user!.username}`)
				.setDescription('Here is the list of commands you can use')
				.setThumbnail(`${client.user!.displayAvatarURL()}`)
				.addFields({
					name: ':information_source:  Bot Info',
					value: `Get more information about the bot: ${
						process.env.MODE === 'DEV'
							? `</botinfo:${DEV.BOT_INFO}>`
							: `</botinfo:${PROD.BOT_INFO}>`
					}`,
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
				folder: 'slashCommands',
				file: 'help',
			});
		}
	},
};

export default help;

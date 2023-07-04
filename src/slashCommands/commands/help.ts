import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import { Command } from '../Command';
import logFile from '../../globalUtilities/logFile';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';

const help: Command = {
	name: 'help',
	description: 'Information about the bot',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setTitle('❓ Help')
				.addFields([
					{
						name: 'Kick',
						value: `kick`,
					},
					{
						name: 'Ban',
						value: `ban`,
					},
					{
						name: 'Timeout',
						value: `timeout`,
					},
					{
						name: 'Warn',
						value: `warn`,
					},
					{
						name: 'Avatar',
						value: `avatar`,
					},
					{
						name: 'Bot Info',
						value: `botinfo`,
					},
					{
						name: 'Server Info',
						value: `serverinfo`,
					},
					{
						name: 'User Info',
						value: `userinfo`,
					},
				]);
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

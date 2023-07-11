import {
	BaseCommandInteraction,
	Client,
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} from 'discord.js';

import { Command } from '../../Command';
import logFile from '../../../globalUtilities/logFile';
import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import botConfig from '../../../botConfig';
import isUserAdmin from '../../../globalUtilities/isUserAdmin';

const admin: Command = {
	name: 'admin',
	description: 'Admin commands',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			if (!isUserAdmin({ userId: interaction.user.id })) {
				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':warning: You are not allowed to run this command!',
							type: types.ERROR,
						}),
					],
				});
			}

			const options: Array<{
				label: string;
				description: string;
				value: string;
			}> = [
				{
					label: 'Welcome Message',
					description: 'Share the welcome message embed',
					value: 'welcome message',
				},
				{
					label: 'Info about server and noob_dev54',
					description:
						'Share the embed to know more about the server and noob_dev54',
					value: 'info',
				},
			];

			const selectMenu = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('admin')
					.setPlaceholder('Select option to execute')
					.addOptions(options),
			);

			const embed = new MessageEmbed()
				.setTitle('Select option to execute')
				.setColor(botConfig.color.default)
				.setTimestamp();

			return await interaction.reply({
				embeds: [embed],
				ephemeral: true,
				components: [selectMenu],
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
				folder: 'slashCommands/admin',
				file: 'admin',
			});
		}
	},
};

export default admin;

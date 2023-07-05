import { Client, SelectMenuInteraction } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../../globalUtilities/infoMessageEmbed';
import logFile from '../../../globalUtilities/logFile';
import { SelectMenu } from '../../SelectMenu';
import welcomeMessage from './welcomeMessage';

const admin: SelectMenu = {
	customId: 'admin',
	run: async (client: Client, interaction: SelectMenuInteraction) => {
		try {
			const option = interaction.values[0];

			if (option === 'welcome message') {
				await welcomeMessage({ interaction: interaction, client: client });
			}

			return await interaction.update({
				embeds: [
					infoMessageEmbed({
						title: `Command executed successfully!`,
						type: types.SUCCESS,
					}),
				],
				components: [],
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
				folder: 'selectMenuHandler/admin',
				file: 'admin',
			});
		}
	},
};

export default admin;

import { Client, ButtonInteraction, MessageEmbed } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import roleIds from '../../roleIds/roleIds';

const aboutServer: Button = {
	customId: 'aboutServer',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle('About the server')
				.setDescription(
					'Initially, this server was created to test all the Discord bots that I have created as well as other Discord bots. The idea has then evolved to allow other programmers to join and request for assistance from me (or other programmers). Soon enough, non-programmers started to join to test out the bots I create (and other cool stuff).\n\nThe server is now open to everyone to join (subject to **verification**) and it also has a separate category for anyone to request support for Etourne (event and tournament management software). ',
				)
				.setTimestamp();

			return await interaction.reply({
				embeds: [embed],
				ephemeral: true,
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
				folder: 'buttonHandler',
				file: 'aboutServer',
			});
		}
	},
};

export default aboutServer;

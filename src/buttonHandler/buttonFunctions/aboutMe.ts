import { Client, ButtonInteraction, MessageEmbed } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import roleIds from '../../roleIds/roleIds';

const aboutMe: Button = {
	customId: 'aboutMe',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor('#FF4454')
				.setTitle('About Me')
				.setDescription(
					'## Hello there :wave:\nI am `noob_dev54`/`mz10ah`/`Infinityboiz ッ`\n\n`💻  Full Stack Developer` - JavaScript/TypeScript,  Python\n`🎮  Gamer`\n`🚂 🎮  Moderator` - The Coding Train and Muslim Gamers League\n\n:globe_with_meridians:  **Website:** https://noobdev54.com\n\n### Technical Skills:\n1. JavaScript/Typescript - ReactJS/NextJS, Discord.js, Express.js\n2. Python - Flask\n3. Figma/Adobe XD\n\n### For Enquiries:\n1. DM <@374230181889572876>\nor\n2. Hit the `Enquire` button (coming soon).',
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
				file: 'aboutMe',
			});
		}
	},
};

export default aboutMe;

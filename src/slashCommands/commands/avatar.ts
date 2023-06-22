import { BaseCommandInteraction, Client, MessageEmbed, User } from 'discord.js';

import logFile from '../../globalUtilities/logFile';
import { Command } from '../Command';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';

const avatar: Command = {
	name: 'avatar',
	description: 'Display avatar of an user',
	options: [
		{
			name: 'user',
			description: 'select user',
			required: true,
			type: 'USER',
		},
	],
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const user: User = interaction.options.getUser('user')!;
			const avatar = user.displayAvatarURL({ size: 4096 });

			//BUG: hexAccentColor not working, bugged from Djs side
			const avatarEmbed = new MessageEmbed()
				.setColor(user.hexAccentColor || botConfig.color.default)
				.setTitle(`Avatar for ${user.tag}`)
				.setDescription(
					`[jpg](${user.displayAvatarURL({
						format: 'jpg',
						size: 4096,
					})}) | [png](${user.displayAvatarURL({
						format: 'png',
						size: 4096,
					})}) | [webp](${user.displayAvatarURL({
						format: 'webp',
						size: 4096,
					})}) | [jpeg](${user.displayAvatarURL({
						format: 'jpeg',
						size: 4096,
					})})`,
				)
				.setImage(avatar)
				.setTimestamp();

			return await interaction.reply({
				embeds: [avatarEmbed],
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

export default avatar;

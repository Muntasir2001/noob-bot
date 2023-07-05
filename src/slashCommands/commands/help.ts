import { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js';

import { Command } from '../Command';
import logFile from '../../globalUtilities/logFile';
import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import botConfig from '../../botConfig';
import commandIds from '../../commandIds/commandIds';

const help: Command = {
	name: 'help',
	description: 'View list of all the commands',
	type: 'CHAT_INPUT',
	run: async (client: Client, interaction: BaseCommandInteraction) => {
		try {
			const embed = new MessageEmbed()
				.setColor(botConfig.color.default)
				.setThumbnail(`${client.user?.displayAvatarURL()}`)
				.setTitle('❓ Help')
				.setDescription('Here is the list of commands you can use')
				.addFields([
					{
						name: ':boot: Kick',
						value: `</kick:${commandIds.KICK}>`,
					},
					{
						name: ':hammer: Ban',
						value: `</ban:${commandIds.BAN}>`,
					},
					{
						name: ':clock: Timeout',
						value: `</timeout:${commandIds.TIMEOUT}>`,
					},
					{
						name: ':stop_sign: Warn',
						value: `</warn:${commandIds.WARN}>`,
					},
					{
						name: ':broom: Purge',
						value: `</purge:${commandIds.PURGE}>`,
					},
					{
						name: ':frame_photo: Avatar',
						value: `</avatar:${commandIds.AVATAR}>`,
					},
					{
						name: ':robot: Bot Info',
						value: `</botinfo:${commandIds.BOT_INFO}>`,
					},
					{
						name: ':information_source: Server Info',
						value: `</serverinfo:${commandIds.SERVER_INFO}>`,
					},
					{
						name: ':bust_in_silhouette: User Info',
						value: `</userinfo:${commandIds.USER_INFO}>`,
					},
				])
				.setTimestamp()
				.setFooter({ text: `Requested by: ${interaction.user.tag}` });

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

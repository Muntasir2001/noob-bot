import { Client, ButtonInteraction, GuildMemberRoleManager } from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import roleIds from '../../roleIds/roleIds';

const closeChannel: Button = {
	customId: 'closeChannel',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const roles = (interaction.member!.roles as GuildMemberRoleManager)
				.cache;

			if (
				!interaction.memberPermissions?.has('MANAGE_CHANNELS') &&
				roles.some((role) => role.id === roleIds.MOD_ROLE)
			) {
				return interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':warning: You are not allowed to use this button!',
							type: types.ERROR,
						}),
					],
					ephemeral: true,
				});
			}

			await interaction.channel?.delete();
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
				file: 'closeTicket',
			});
		}
	},
};

export default closeChannel;

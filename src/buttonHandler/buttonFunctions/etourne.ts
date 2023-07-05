import {
	Client,
	ButtonInteraction,
	GuildMemberRoleManager,
	GuildMember,
} from 'discord.js';

import infoMessageEmbed, {
	types,
} from '../../globalUtilities/infoMessageEmbed';
import logFile from '../../globalUtilities/logFile';
import { Button } from '../Button';
import roleIds from '../../roleIds/roleIds';

const etourne: Button = {
	customId: 'etourne',
	run: async (client: Client, interaction: ButtonInteraction) => {
		try {
			const userRoles = (interaction.member!.roles as GuildMemberRoleManager)
				.cache;
			const role = interaction.guild!.roles.cache.find(
				(r) => r.id === roleIds.ETOURNE,
			);

			const { member } = interaction;

			if (!userRoles.some((role) => role.id === roleIds.ETOURNE)) {
				if (member instanceof GuildMember)
					member!.roles.add(roleIds.ETOURNE);

				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':white_check_mark: Etourne role added!',
							type: types.SUCCESS,
						}),
					],
				});
			} else {
				if (member instanceof GuildMember)
					member!.roles.remove(roleIds.ETOURNE);

				return await interaction.reply({
					embeds: [
						infoMessageEmbed({
							title: ':white_check_mark: Etourne role removed!',
							type: types.SUCCESS,
						}),
					],
				});
			}
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
				file: 'etourne',
			});
		}
	},
};

export default etourne;

const fs = require('fs');

const { MessageEmbed, Permissions } = require('discord.js');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkChannelCategoryExist = require('../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../globalUtils/resolveChannelCategoryByID');
const roleIDs = require('../../TEST_ROLE_IDS/roleIDs');

const closeWarnChannel = async (interaction, client) => {
	try {
		if (
			!interaction.memberPermissions.has('MANAGE_MESSAGES') &&
			!interaction.member.roles.cache.some(
				(role) => role.id === roleIDs.modRole,
			)
		) {
			return interaction.reply({
				embeds: [
					infoMessageEmbed(
						':warning: You are not allowed to use this button!',
						'WARNING',
					),
				],
			});
		}

		const guildId = process.env.GUILD_ID;

		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(interaction.guild.id);

		const channel = await guild.channels.resolve(
			interaction.message.channelId,
		);

		await channel.delete();
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/closeWarnChannel.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = closeWarnChannel;

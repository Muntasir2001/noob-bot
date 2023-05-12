const fs = require('fs');

const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const roleIDs = require('../../TEST_ROLE_IDS/roleIDs.json');

const closeWarnChannel = async (interaction, client) => {
	try {
		if (
			!interaction.memberPermissions.has('MANAGE_CHANNELS') &&
			!interaction.member.roles.cache.some(
				(role) => role.id === roleIDs.MOD_ROLE,
			)
		) {
			return interaction.reply({
				embeds: [
					infoMessageEmbed(
						':warning: You are not allowed to use this button!',
						'WARNING',
					),
				],
				ephemeral: true,
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

const fs = require('fs');

const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const roleIDs = require('../../TEST_ROLE_IDS/roleIDs.json');

const etourne = async (interaction, client) => {
	try {
		const role = interaction.guild.roles.cache.find(
			(r) => r.id === roleIDs.ETOURNE,
		);

		if (
			!interaction.member.roles.cache.some(
				(role) => role.id === roleIDs.ETOURNE,
			)
		) {
			interaction.member.roles.add(role);

			return await interaction.reply({
				embeds: [infoMessageEmbed('Etourne role added!', 'SUCCESS')],
				ephemeral: true,
			});
		} else {
			interaction.member.roles.remove(role);

			return await interaction.reply({
				embeds: [infoMessageEmbed('Etourne role removed!', 'SUCCESS')],
				ephemeral: true,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/etourne.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = etourne;

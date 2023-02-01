const fs = require('fs');

const { MessageEmbed, Permissions } = require('discord.js');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkChannelCategoryExist = require('../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../globalUtils/resolveChannelCategoryByID');
const roleIDs = require('../../TEST_ROLE_IDS/roleIDs');

const verifyUser = async (interaction, client) => {
	try {
		const guildId = process.env.GUILD_ID;

		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(interaction.guild.id);

		if (await checkChannelCategoryExist(guild, 'Verify')) {
			const channelCategoryID = await getChannelCategoryID(guild, 'Verify');

			const channelCategoryResolved = await resolveChannelCategoryByID(
				guild,
				channelCategoryID,
			);

			const verifyChannelCreate = channelCategoryResolved.createChannel(
				`verify-${interaction.user.username}`,
				{
					type: 'GUILD_TEXT',
					topic: `Verify ${interaction.user.id}`,
					reason: `Verify ${interaction.user.id}`,
					permissionOverwrites: [
						{
							id: guild.roles.everyone,
							deny: [Permissions.FLAGS.VIEW_CHANNEL],
						},
						{
							id: await guild.roles.fetch(roleIDs.modRole),
							allow: [
								Permissions.FLAGS.VIEW_CHANNEL,
								Permissions.FLAGS.SEND_MESSAGES,
								Permissions.FLAGS.ATTACH_FILES,
								Permissions.FLAGS.EMBED_LINKS,
								Permissions.FLAGS.READ_MESSAGE_HISTORY,
							],
						},
						{
							id: interaction.user.id,
							allow: [
								Permissions.FLAGS.VIEW_CHANNEL,
								Permissions.FLAGS.SEND_MESSAGES,
							],
						},
					],
				},
			);

			await verifyChannelCreate.then((data) => {
				verifyChannel = data;
			});

			verifyChannel.send({
				content: `<@${interaction.user.id}>`,
				embeds: [
					infoMessageEmbed(
						'Please wait until one of the moderators verifies you.',
					),
				],
			});

			await interaction.reply({
				content: `${verifyChannel} was created, please go there to get verified.`,
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				embeds: [infoMessageEmbed('Something went wrong!', 'ERROR')],
				ephemeral: true,
			});
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/verifyUser.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = verifyUser;

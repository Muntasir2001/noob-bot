const fs = require('fs');

const { MessageEmbed } = require('discord.js');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkChannelCategoryExist = require('../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../globalUtils/resolveChannelCategoryByID');

const verify = async (interaction, client) => {
	try {
		const { guild } = interaction;

		if (await checkChannelCategoryExist(guild, 'Verify')) {
			const channelCategoryID = await getChannelCategoryID(guild, 'Verify');

			const channelCategoryResolved = await resolveChannelCategoryByID(
				guild,
				channelCategoryID,
			);

			let verifyChannelCreate = channelCategoryResolved.createChannel(
				`verify-${i.user.username}`,
				{
					type: 'GUILD_TEXT',
					topic: `Verify ${i.user.id}`,
					reason: `Verify ${i.user.id}`,
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
							id: i.user.id,
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
				content: `<@${i.user.id}>`,
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
		}
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/verify.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = verify;

const fs = require('fs');

const { Permissions, MessageActionRow, MessageButton } = require('discord.js');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');
const checkChannelCategoryExist = require('../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../globalUtils/resolveChannelCategoryByID');

const enquire = async (interaction, client) => {
	try {
		const guildId = process.env.GUILD_ID;

		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(interaction.guild.id);

		if (await checkChannelCategoryExist(guild, 'Enquire')) {
			const channelCategoryID = await getChannelCategoryID(guild, 'Enquire');

			const channelCategoryResolved = await resolveChannelCategoryByID(
				guild,
				channelCategoryID,
			);

			const enquireChannelCreate = channelCategoryResolved.createChannel(
				`enquiry-${interaction.user.username}`,
				{
					type: 'GUILD_TEXT',
					topic: `Enquiry from ${interaction.user.id}`,
					reason: `Enquiry from ${interaction.user.id}`,
					permissionOverwrites: [
						{
							id: guild.roles.everyone,
							deny: [Permissions.FLAGS.VIEW_CHANNEL],
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

			let enquireChannel;

			await enquireChannelCreate.then((data) => {
				enquireChannel = data;
			});

			const buttons = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('closeTicket')
					.setLabel('Close ticket')
					.setStyle('DANGER'),
			);

			enquireChannel.send({
				content: `<@${interaction.user.id}>`,
				embeds: [
					infoMessageEmbed(
						'Please wait until one of the moderators verifies you.',
					),
				],
				components: [buttons],
			});

			await interaction.reply({
				content: `${enquireChannel} was created, please go there for your enquiry.`,
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
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/enquire.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = enquire;

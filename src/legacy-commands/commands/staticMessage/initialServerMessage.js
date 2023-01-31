const {
	Permissions,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');
const checkUserIds = require('../../../globalUtils/checkUserIDs');
const checkChannelCategoryExist = require('../../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../../globalUtils/resolveChannelCategoryByID');
const getTextChannel = require('../../utilities/getTextChannel');
const roleIDs = require('../../../configs/roleIDs');

const guildId = process.env.GUILD_ID;

const initialServerMessage = async (message, CMD_NAME, args, client) => {
	try {
		if (!checkUserIds(message)) {
			return message.reply({
				embeds: [
					infoMessageEmbed('You are not allowed to run this command'),
				],
			});
		}

		if (!args[0]) {
			return message.reply({
				embeds: [
					infoMessageEmbed('Please provide channel ID or tag a channel'),
				],
			});
		}

		const { channel } = message;

		let verifyChannel;

		if (args[0].charAt(0) === '<' && args[0].charAt(1) === '#') {
			verifyChannel = await getTextChannel(
				args[0].slice(2).slice(0, -1),
				message,
			);
		} else {
			verifyChannel = await getTextChannel(args[0], message);
		}

		const guild = guildId
			? client.guilds.cache.get(guildId)
			: client.guilds.cache.get(message.guild.id);

		const { name } = guild;
		const icon = guild.iconURL();

		const verifyMessageEmbed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`${name}`)
			.addFields(
				{
					name: '• `Verify me`',
					value: 'To verify yourself before you get to see all the channel of the server.',
				},
				// { name: '\u200B', value: '\u200B' },
			)
			.setTimestamp()
			.setFooter({ text: name, iconURL: icon });

		const buttons = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('verify')
				.setLabel('Verify me')
				.setStyle('PRIMARY'),
		);

		verifyChannel.send({
			embeds: [verifyMessageEmbed],
			components: [buttons],
		});

		client.on('interactionCreate', async (i) => {
			if (!i.isButton()) return;

			if (i.customId === 'verify') {
				let verifyChannel;

				if (await checkChannelCategoryExist(guild, 'Verify')) {
					const channelCategoryID = await getChannelCategoryID(
						guild,
						'Verify',
					);

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

					await i.reply({
						content: `${verifyChannel} was created, please go there to get verified.`,
						ephemeral: true,
					});
				} else {
					return i.reply({
						embeds: [infoMessageEmbed('Something went wrong!')],
						ephemeral: true,
					});
				}
			}
		});
	} catch (err) {
		message.reply({
			embeds: [infoMessageEmbed('Something went wrong!')],
		});

		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommands/staticMessage/initialServerMessage.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = initialServerMessage;

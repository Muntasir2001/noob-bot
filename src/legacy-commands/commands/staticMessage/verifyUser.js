const fs = require('fs');

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');
const checkUserIds = require('../../../globalUtils/checkUserIDs');
const checkChannelCategoryExist = require('../../../globalUtils/checkChannelCategoryExist');
const getChannelCategoryID = require('../../../globalUtils/getChannelCategoryID');
const resolveChannelCategoryByID = require('../../../globalUtils/resolveChannelCategoryByID');
const getTextChannel = require('../../utilities/getTextChannel');
const roleIDs = require('../../../TEST_ROLE_IDS/roleIDs');

const guildId = process.env.GUILD_ID;

const verifyUser = async (message, CMD_NAME, args, client) => {
	try {
		if (!checkUserIds(message)) {
			return message.reply({
				embeds: [
					infoMessageEmbed(
						'You are not allowed to run this command',
						'WARNING',
					),
				],
			});
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
				.setCustomId('verifyUser')
				.setLabel('Verify me')
				.setStyle('PRIMARY'),
		);

		if (args[0]) {
			let verifyChannel;

			if (args[0].charAt(0) === '<' && args[0].charAt(1) === '#') {
				verifyChannel = await getTextChannel(
					args[0].slice(2).slice(0, -1),
					message,
				);
			} else {
				verifyChannel = await getTextChannel(args[0], message);
			}

			verifyChannel.send({
				embeds: [verifyMessageEmbed],
				components: [buttons],
			});
		} else {
			message.channel.send({
				embeds: [verifyMessageEmbed],
				components: [buttons],
			});
		}
	} catch (err) {
		message.reply({
			embeds: [infoMessageEmbed('Something went wrong!')],
		});

		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommands/staticMessage/verifyUser.js \n Actual error: ${err} \n \n`,
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

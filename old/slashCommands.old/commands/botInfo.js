const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const PREFIX = process.env.PREFIX;

const botInfo = async (interaction, CMD_NAME, options, client) => {
	try {
		const member = interaction.user.tag;
		const { user, guilds } = client;

		const botInfoEmbed = new MessageEmbed()
			.setColor('#ff4454')
			.setThumbnail(user.displayAvatarURL())
			.setAuthor({
				name: `${user.username}`,
				iconURL: `${user.displayAvatarURL()}`,
			})
			.addFields(
				// { name: '\u200B', value: '\u200B' },
				{ name: 'Bot Tag', value: `${user.tag}` },
				{ name: 'Bot creator', value: `mz10ah#0054` },
				{ name: 'Bot version', value: `1.0.0` },
				{ name: 'Bot command prefix', value: `${PREFIX}` },
				{
					name: 'Time since last restart',
					value: `${process.uptime().toFixed(2)}s`,
				},
				{
					name: 'Server Count',
					value: `${guilds.cache.size.toString()}`,
				},
			)
			.setTimestamp()
			.setFooter({ text: `Requested by: ${member}` });

		return interaction.reply({
			embeds: [botInfoEmbed],
			ephemeral: false,
		});
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/botInfo.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);

			return false;
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = botInfo;

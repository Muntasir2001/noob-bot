const Discord = require('discord.js');

const messageDeleteBulkLogger = (
	executor,
	guild,
	logChannelId,
	client,
	amount,
	channel,
) => {
	const logEmbed = new Discord.MessageEmbed()
		.setColor('#FF4454')
		.setTitle('Bulk Messages Deleted')
		.setThumbnail(executor.displayAvatarURL())
		.setAuthor(executor.tag || 'Unknown Deleter', executor.displayAvatarURL())
		.setDescription(
			`${amount} messages were deleted from ${channel} by <@${executor.id}>`,
		)
		.setTimestamp();

	if (!guild.channels.resolve(logChannelId)) return;

	const logChannel = guild.channels.resolve(logChannelId);

	logChannel.send({ embeds: [logEmbed] });
};

module.exports = messageDeleteBulkLogger;

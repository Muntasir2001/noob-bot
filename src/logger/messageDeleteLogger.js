const Discord = require('discord.js');

const messageDeleteLogger = (
	message,
	executor,
	target,
	guild,
	logChannelId,
	client,
) => {
	const { content, channelId, author, id } = message;

	const logEmbed = new Discord.MessageEmbed()
		.setColor('#FF4454')
		.setTitle('Message Deleted')
		.setThumbnail(executor.displayAvatarURL())
		.setAuthor(executor.tag || 'Unknown Deleter', executor.displayAvatarURL())
		.addFields(
			{
				name: 'Message Sender',
				value: author ? `<@${author.id}>` : target ? target : 'Unknown',
				// value: author || target || 'Unknown',
				inline: true,
			},
			{
				name: 'Deleted by',
				value: executor ? `<@${executor.id}>` : 'Unknown',
				inline: true,
			},
			{
				name: 'Channel',
				value: `<#${channelId}>` || 'Unknown',
				inline: true,
			},
			{
				name: 'Content of the message',
				value: content || 'Unknown',
				inline: false,
			},
		)
		.setFooter(`MessageID: ${id}`);

	const logChannel = guild.channels.resolve(logChannelId);

	logChannel.send({ embeds: [logEmbed] });

	// console.log('message', message);
};

module.exports = messageDeleteLogger;

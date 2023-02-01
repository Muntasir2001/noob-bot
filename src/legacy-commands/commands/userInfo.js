const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const userInfo = async (message, CMD_NAME, args, client) => {
	try {
		const user =
			message.mentions.users.first() || args[0] || message.member.user;

		const member = await message.guild.members
			.fetch(user)
			.catch((err) => message.channel.send(`${user} is an unknown user`));
		// console.log(message.member);

		let roles = member.roles.cache
			.map((r) => r)
			.join(' ')
			.replace('@everyone', ' ');
		roles = roles.length > 1 ? roles : 'No Roles';

		const userInfoEmbed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`Information about ${member.user.username}`)
			.setAuthor({
				name: `${member.user.username}`,
				iconURL: `${member.user.displayAvatarURL()}`,
			})
			.setThumbnail(`${member.user.displayAvatarURL()}`)
			.addFields(
				{
					name: 'User tag',
					value: member.user.tag || 'None',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: 'Nickname',
					value: member.user.nickname || 'None',
					inline: true,
				},
				// { name: '\u200B', value: '\u200B', inline: true },
				{
					name: 'Account created',
					value:
						`<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>` ||
						'None',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: 'Joined the server',
					value:
						`<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` ||
						'None',
					inline: true,
				},
			)
			.addField('Roles', `${roles}`)
			.addField('User ID', `\`${member.id}\``)
			.setTimestamp()
			.setFooter({
				text: `${client.user.username}`,
				iconURL: client.user.displayAvatarURL(),
			});

		message.channel.send({ embeds: [userInfoEmbed] });
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in legacyCommand/userInfo.js \n Actual error: ${err} \n \n`,
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

module.exports = userInfo;

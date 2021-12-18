const { MessageEmbed } = require('discord.js');

const userInfo = async (message, CMD_NAME, args, client) => {
	const user =
		message.mentions.users.first() || args[0] || message.member.user;

	const member = await message.guild.members
		.fetch(user)
		.catch((err) => message.channel.send(`${user} is an unknown user`));
	console.log(message.member);

	console.log(member);

	let roles = member.roles.cache
		.map((r) => r)
		.join(' ')
		.replace('@everyone', ' ');
	roles = roles.length > 1 ? roles : 'No Roles';

	if (args.length !== 0) {
		const userInfoEmbed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`Information about ${member.user.username}`)
			.setAuthor(
				`${member.user.username}`,
				`${member.user.displayAvatarURL()}`,
			)
			.setThumbnail(`${member.user.displayAvatarURL()}`)
			.addFields(
				{ name: 'User tag', value: member.user.tag },
				// { name: '\u200B', value: '\u200B' },
				{
					name: 'Status',
					value: member.presence.status,
					inline: true,
				},
				{
					name: 'Account created',
					value: new Date(
						member.user.createdTimestamp,
					).toLocaleDateString(),
					inline: true,
				},
				{
					name: 'Joined the server',
					value: new Date(member.joinedTimestamp).toLocaleDateString(),
					inline: true,
				},
			)
			.addField(
				'Roles',
				member._roles.map((role) => {
					return `<@&${role}>`;
				}),
			)
			.setTimestamp()
			.setFooter(
				`${client.user.username}`,
				`${client.user.displayAvatarURL()}`,
			);

		message.channel.send(userInfoEmbed);
	} else {
		const userInfoEmbed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`Information about ${member.user.username}`)
			.setAuthor(
				`${member.user.username}`,
				`${member.user.displayAvatarURL()}`,
			)
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
						new Date(member.user.createdTimestamp).toLocaleString() ||
						'None',
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: 'Joined the server',
					value:
						new Date(member.joinedTimestamp).toLocaleString() || 'None',
					inline: true,
				},
			)
			.addField('Roles', `${roles}`)
			.setTimestamp()
			.setFooter(
				`${client.user.username}`,
				`${client.user.displayAvatarURL()}`,
			);

		message.channel.send({ embeds: [userInfoEmbed] });
	}
};

module.exports = userInfo;

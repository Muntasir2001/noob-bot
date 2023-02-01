const { MessageEmbed } = require('discord.js');

const userInfo = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');

		// console.log('user', user);
		// console.log('interaction.member', interaction.member.user.id);

		let member;

		if (!user) {
			member = interaction.guild.members.cache.get(
				interaction.member.user.id,
			);
		} else {
			member = interaction.guild.members.cache.get(user.id);
		}

		// console.log('member', member);

		let roles = member.roles.cache
			.map((r) => r)
			.join(' ')
			.replace('@everyone', ' ');
		roles = roles.length > 1 ? roles : 'No Roles';

		const userInfoEmbed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`Information about ${member.user.username}`)
			.setAuthor({
				name: `${member.user.username}` || 'None',
				iconURL: `${member.user.displayAvatarURL()}` || 'None',
			})
			.setThumbnail(`${member.user.displayAvatarURL()}` || 'None')
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
				text: `${client.user.username}` || 'None',
				iconURL: client.user.displayAvatarURL(),
			});

		return interaction.reply({
			embeds: [userInfoEmbed],
			ephemeral: false,
		});
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand userInfo.js',
			actualErr: err,
		});
	}
};

module.exports = userInfo;

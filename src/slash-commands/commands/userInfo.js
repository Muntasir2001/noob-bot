const { MessageEmbed } = require('discord.js');

const userInfo = async (interaction, CMD_NAME, options, client) => {
	const user = options.getUser('user');

	// console.log('user', user);
	// console.log('interaction.member', interaction.member.user.id);

	let member;

	if (!user) {
		member = interaction.guild.members.cache.get(interaction.member.user.id);
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
		.setAuthor(
			`${member.user.username}` || null,
			`${member.user.displayAvatarURL()}` || null,
		)
		.setThumbnail(`${member.user.displayAvatarURL()}` || null)
		.addFields(
			{ name: 'User tag', value: member.user.tag || null },
			// { name: '\u200B', value: '\u200B' },
			{
				name: 'Account created',
				value:
					new Date(member.user.createdTimestamp).toLocaleString() || null,
				inline: true,
			},
			{
				name: 'Joined the server',
				value: new Date(member.joinedTimestamp).toLocaleString() || null,
				inline: true,
			},
		)
		.addField('Roles', `${roles}`)
		.setTimestamp()
		.setFooter(
			`${client.user.username}` || null,
			`${client.user.displayAvatarURL()}` || null,
			false,
		);

	return interaction.reply({
		embeds: [userInfoEmbed],
		ephemeral: false,
	});
};

module.exports = userInfo;

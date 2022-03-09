const { MessageEmbed } = require('discord.js');

const getMember = require('../utilities/getMember');

const avatar = async (interaction, CMD_NAME, options, client) => {
	if (CMD_NAME === 'avatar') {
		const user = options.getUser('user');
		const member = await getMember(
			interaction,
			user || interaction.member.user,
		);
		const avatar = member.displayAvatarURL({ size: 2048 });

		const avatarEmbed = new MessageEmbed()
			.setColor(member.hexAccentColor || '#FF4454')
			.setTitle(`Avatar for ${member.tag}`)
			.setDescription(
				`[jpg](${member.displayAvatarURL({
					format: 'jpg',
					size: 4096,
				})}) | [png](${member.displayAvatarURL({
					format: 'png',
					size: 4096,
				})}) | [webp](${member.displayAvatarURL({
					format: 'webp',
					size: 4096,
				})}) | [jpeg](${member.displayAvatarURL({
					format: 'jpeg',
					size: 4096,
				})})`,
			)
			.setImage(avatar);

		interaction.reply({ embeds: [avatarEmbed] });
	}
};

module.exports = avatar;

const fs = require('fs');

const { MessageEmbed } = require('discord.js');

const getClientMember = require('../../globalUtils/getClientMember');

const avatar = async (interaction, CMD_NAME, options, client) => {
	try {
		const user = options.getUser('user');
		const member = await getClientMember({
			client: client,
			interaction: interaction,
			user: user || interaction.member.user,
			force: true,
		});
		const avatar = member.displayAvatarURL({ size: 4096 });

		// console.log(member.user.hexAccentColor)
		//BUG: hexAccentColor not working, bugged from Djs side
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
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/avatar.js \n Actual error: ${err} \n \n`,
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

module.exports = avatar;

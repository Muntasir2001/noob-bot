const { MessageEmbed } = require('discord.js');

const getClientMember = require('../../globalUtils/getClientMember');

const avatar = async (message, CMD_NAME, args, client) => {
	try {
		let avatar;
		let member;

		if (message.mentions.members.first()) {
			member = message.mentions.members.first().user;
			avatar = message.mentions.members
				.first()
				.displayAvatarURL({ size: 4096 });
		} else {
			member = await getClientMember({
				client: client,
				user: args[0] || message.member.user,
				message: message,
				force: true,
			});
			avatar = member.displayAvatarURL({ size: 4096 });
		}

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

		message.channel.send({ embeds: [avatarEmbed] });
	} catch (err) {
		console.log({
			message: 'something went wrong in legacy avatar.js',
			actualErr: err,
		});
	}
};

module.exports = avatar;

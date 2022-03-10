const { MessageEmbed } = require('discord.js');

const getMember = require('../utilities/getMember');

const avatar = async (message, CMD_NAME, args, client) => {
   if (CMD_NAME === 'avatar') {
      let avatar;
      let member;

      if (message.mentions.members.first()) {
         member = message.mentions.members.first().user;
         avatar = message.mentions.members
            .first()
            .displayAvatarURL({ size: 4096 });
      } else {
         member = await getMember(
            client,
            args[0] || message.member.user,
            message,
            true
         );
         avatar = member.displayAvatarURL({ size: 2048 });
      }

      const avatarEmbed = new MessageEmbed()
         .setColor(member.user.hexAccentColor || '#FF4454')
         .setTitle(`Avatar for ${member.user.tag}`)
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
            })})`
         )
         .setImage(avatar);

      message.channel.send({ embeds: [avatarEmbed] });
   }
};

module.exports = avatar;

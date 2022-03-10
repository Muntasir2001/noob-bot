const { MessageEmbed } = require('discord.js');

const getMember = require('../utilities/getMember');

const avatar = async (message, CMD_NAME, args, client) => {
   if (CMD_NAME === 'avatar') {
      let avatar;
      let user;

      if (message.mentions.members.first()) {
         user = message.mentions.members.first().user;
         avatar = message.mentions.members
            .first()
            .displayAvatarURL({ size: 4096 });
      } else {
         user = await getMember(
            client,
            args[0] || message.member.user,
            message.channel,
            true
         );
         avatar = user.displayAvatarURL({ size: 2048 });
      }

      const avatarEmbed = new MessageEmbed()
         .setColor(user.hexAccentColor || '#FF4454')
         .setTitle(`Avatar for ${user.tag}`)
         .setDescription(
            `[jpg](${user.displayAvatarURL({
               format: 'jpg',
               size: 4096,
            })}) | [png](${user.displayAvatarURL({
               format: 'png',
               size: 4096,
            })}) | [webp](${user.displayAvatarURL({
               format: 'webp',
               size: 4096,
            })}) | [jpeg](${user.displayAvatarURL({
               format: 'jpeg',
               size: 4096,
            })})`
         )
         .setImage(avatar);

      message.channel.send({ embeds: [avatarEmbed] });
   }
};

module.exports = avatar;

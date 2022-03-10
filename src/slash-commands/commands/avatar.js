const { MessageEmbed } = require('discord.js');

const getMember = require('../utilities/getMember');

const avatar = async (interaction, CMD_NAME, options, client) => {
   if (CMD_NAME === 'avatar') {
      const user = options.getUser('user');
      const member = await getMember(
         interaction,
         user || interaction.member.user,
         true
      );
      const avatar = member.user.displayAvatarURL({ size: 4096 });

      // console.log(member.user.hexAccentColor)
      //BUG: hexAccentColor not working, bugged from Djs side
      const avatarEmbed = new MessageEmbed()
         .setColor(member.user.hexAccentColor || '#FF4454')
         .setTitle(`Avatar for ${member.user.tag}`)
         .setDescription(
            `[jpg](${member.user.displayAvatarURL({
               format: 'jpg',
               size: 4096,
            })}) | [png](${member.user.displayAvatarURL({
               format: 'png',
               size: 4096,
            })}) | [webp](${member.user.displayAvatarURL({
               format: 'webp',
               size: 4096,
            })}) | [jpeg](${member.user.displayAvatarURL({
               format: 'jpeg',
               size: 4096,
            })})`
         )
         .setImage(avatar);

      interaction.reply({ embeds: [avatarEmbed] });
   }
};

module.exports = avatar;

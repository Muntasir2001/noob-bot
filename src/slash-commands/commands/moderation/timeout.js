const { MessageEmbed } = require('discord.js');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const getMember = require('../../utilities/getMember');

const timeout = async (interaction, CMD_NAME, options) => {
   const user = options.getUser('user', true);
   const time = options.getNumber('time');
   const reason = options.getString('reason');

   if (!interaction.memberPermissions.has('MODERATE_MEMBERS')) {
      return interaction.reply({
         embeds: [
            infoMessageEmbed(
               'HEY HEY HEY there, I see what you trynna do there :eyes:'
            ),
         ],
         ephemeral: false,
      });
   }

   const member = await getMember(interaction, user, false);

   /* if user not found */
   if (!member) {
      console.log('Please tag an user to timeout');

      return interaction.reply({
         embeds: [infoMessageEmbed(`Please tag an user to timeout`)],
         ephemeral: false,
      });
   }

   if (!member.moderatable) {
      return interaction.reply({
         embeds: [infoMessageEmbed(`User cannot be timeout out :(`)],
         ephemeral: false,
      });
   }

   const timeoutEmbed = new MessageEmbed()
      .setColor('#FF4454')
      .setTitle(`:alarm_clock: Timed out ${member.user.tag}`)
      .addFields(
         {
            name: 'Moderator',
            value: `${interaction.member.user}`,
         },
         {
            name: 'Timed out user',
            value: `<@${member.user.id}>`,
         },
         {
            name: 'Timeout length',
            value: time === 1 ? `${time} minute` : `${time} minutes`,
         },
         {
            name: 'Reason',
            value: reason,
         }
      )
      .setTimestamp()
      .setFooter({ text: `Member ID: ${member.id}` });

   member
      .timeout(time * 1000 * 60, reason)
      .then(() => {
         interaction.reply({
            embeds: [timeoutEmbed],
            ephemeral: false,
         });
      })
      .catch((err) => {
         console.log(err);

         return interaction.reply({ content: `Couldn't timeout ${user}` });
      });
};

module.exports = timeout;

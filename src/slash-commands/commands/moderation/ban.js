const { MessageEmbed } = require('discord.js');

const getMember = require('../../utilities/getMember');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const ban = async (interaction, CMD_NAME, options) => {
   const user = options.getUser('user', true);
   const days = options.getNumber('days');
   const reason = options.getString('reason');

   if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
      return interaction.reply({
         embeds: [
            infoMessageEmbed(
               'HEY HEY HEY there, I see what you trynna do there :eyes:'
            ),
         ],
         ephemeral: false,
      });
   }

   const target = await getMember(interaction, user, false);

   /* if user not found */
   if (!target) {
      console.log('Please tag an user to ban');

      return interaction.reply({
         embeds: [infoMessageEmbed(`Please tag an user to ban`)],
         ephemeral: false,
      });
   }

   /* if user bannable */
   if (!target.bannable) {
      return interaction.reply({
         embeds: [infoMessageEmbed(`User not bannable :(`)],
         ephemeral: false,
      });
   }

   await target
      .ban({ reason, days: days })
      .then(() => {
         const banEmbed = new MessageEmbed()
            .setColor('#FF4454')
            .setTitle(`:no_entry: Banned ${target.user.tag}`)
            .addFields(
               {
                  name: 'Moderator',
                  value: `${interaction.member.user}`,
               },
               {
                  name: 'Banned user',
                  value: `${user}`,
               },
               {
                  name: 'Reason',
                  value: reason,
               }
            )
            .setTimestamp()
            .setFooter({ text: `Member ID: ${target.user.id}` });

         interaction.reply({
            embeds: [banEmbed],
            ephemeral: false,
         });
      })
      .catch((err) => console.log(err));
};

module.exports = ban;

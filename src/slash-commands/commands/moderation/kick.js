const { MessageEmbed } = require('discord.js');

const getMember = require('../../utilities/getMember');
const infoMessageEmbed = require('../../../globalUtils/infoMessageEmbed');

const kick = async (interaction, CMD_NAME, options) => {
   const user = options.getUser('user', true);
   const reason = options.getString('reason');

   if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
      return interaction.reply({
         content: 'HEY HEY HEY there, I see what you trynna do there :eyes:',
         ephemeral: false,
      });
   }

   const target = await getMember(interaction, user, false);

   /* if user not found */
   if (!target) {
      console.log('Please tag an user to kick');

      return interaction.reply({
         content: `Please tag an user to kick`,
         ephemeral: false,
      });
   }

   /* if user kickable */
   if (!target.kickable) {
      return interaction.reply({
         embeds: [infoMessageEmbed(`User not kickable :(`)],
         ephemeral: false,
      });
   }

   await target
      .kick(reason)
      .then(() => {
         const kickEmbed = new MessageEmbed()
            .setColor('#FF4454')
            .setTitle(`:stop_sign: Kicked ${target.user.tag}`)
            .addFields(
               {
                  name: 'Moderator',
                  value: `${interaction.member.user}`,
               },
               {
                  name: 'Kicked user',
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
            embeds: [kickEmbed],
            ephemeral: false,
         });
      })
      .catch((err) => console.log(err));
};

module.exports = kick;

const ban = async (message, CMD_NAME, args, client) => {
   let isBannable = true;

   if (CMD_NAME === 'ban') {
      if (!message.member.permissions.has('BAN_MEMBERS'))
         return message.reply(
            'HEY HEY HEY there, I see what you trynna do there :eyes:'
         );

      if (!args[0]) {
         return message.reply('Please provide an user ID or tag an User');
      }

      if (!args[1]) {
         return message.reply('Please provide a reason');
      }

      message.mentions.members.first() ||
         (await client.users.fetch(args[0]).catch((err) => {
            message.channel.send(`${args[0]} is an unknown user`);

            isBannable = false;
         }));

      if (isBannable) {
         await message.guild.members
            .ban(args[0])
            .then((member) => {
               message.channel.send(
                  `${member} has been banned from this server :3`
               );
            })
            .catch((err) => {
               message.channel.send('Welp, something went wrong');
            });
      }
   }
};

module.exports = ban;

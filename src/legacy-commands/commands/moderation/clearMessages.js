const clearMessages = async (message, CMD_NAME, args) => {
   if (CMD_NAME === 'clear') {
      //fetches all the messages****use it for clearChannel command
      // message.channel.messages.fetch().then((results) => {

      // });
      if (message.member.permissions.has('MANAGE_MESSAGES')) {
         if (args.length === 0) {
            await message.channel
               .bulkDelete(parseInt(2))
               .catch((e) =>
                  message.channel.send(`Welp, something went wrong`)
               );
         } else {
            message.channel
               .bulkDelete(parseInt(args[0]) + 1)
               .catch((e) =>
                  message.channel.send(`Welp, something went wrong`)
               );
         }
      } else {
         message.reply(
            'HEY HEY HEY there, I see what you trynna do there :eyes:'
         );
      }
   }
};

module.exports = clearMessages;

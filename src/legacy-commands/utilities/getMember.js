const getMember = async (client, userID, message, force) => {
   try {
      const member = await message.guild.members
         .fetch(userID, { force: force })
         .catch((err) => {
            message.channel.send(`${userID} is an unknown user`);
            console.log(err);
         });

      return member;
   } catch (errr) {
      return;
   }
};

module.exports = getMember;

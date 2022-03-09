const getMember = async (client, userID, channel) => {
   try {
      const user = await client.users.fetch(userID).catch((err) => {
         channel.send(`${userID} is an unknown user`);
         console.log(err);
      });

      return user;
   } catch (errr) {
      return;
   }
};

module.exports = getMember;

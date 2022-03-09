const { MessageEmbed } = require('discord.js');

const getMember = require('../utilities/getMember');

const avatar = async (message, CMD_NAME, args, client) => {
   const user =
      message.mentions.members.first().displayAvatarURL() ||
      (await getMember(client, args[0], message.channel));

   console.log(user);
};

module.exports = avatar;

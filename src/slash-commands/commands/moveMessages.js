const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const {
   getMessagesInRange,
   usersHavePermission,
   findMessageInGuild,
   getInfoFromCommandInteraction,
} = require('../../discord-utils');
const { filterOutFalsy } = require('../../utils');

const moveMessage = async (channel, message, replyTo) => {
   await channel.sendTyping();

   const newMessageEmbed = new MessageEmbed({
      author: {
         name: message.author.username,
         icon_url: message.author.avatarURL() || undefined,
      },
      description: message.content,
   });

   const newMessageArgs = {
      embeds: [newMessageEmbed].concat(message.embeds),
      files: Array.from(message.attachments.values()),
   };

   const newMessage = await (replyTo
      ? replyTo.reply(newMessageArgs)
      : channel.send(newMessageArgs));
   await message.delete();

   return newMessage;
};

const moveMessages = async (interaction, CMD_NAME, options, client) => {
   const channelId = options.getChannel('to_channel').id;
   const startId = options.getString('start_message_id');
   const endId = options.getString('end_message_id');

   console.log('to channel ID: ', channelId);

   const toChannel = await interaction.guild.channels.fetch(channelId);

   if (!toChannel || !toChannel.isText()) {
      interaction.reply(`Could not resolve toChannel: <#${channelId}>`);
      return null;
   }

   const [startMsg, fromChannel] = await findMessageInGuild(
      startId,
      interaction.guild,
      interaction.channel
   );

   if (!startMsg || !fromChannel) {
      await interaction.reply('Could not find starting message.');
      return null;
   }

   if (toChannel.id === fromChannel.id) {
      await interaction.reply("You're moving messages to the same channel??");
      return null;
   }

   const { author } = await getInfoFromCommandInteraction(interaction, {
      ephemeral: true,
   });

   if (!author) {
      await interaction.reply('Could not find who is invoking this command.');
      return null;
   }

   const authorAndBot = filterOutFalsy([author, client.user]);

   // INFO: permission
   if (
      !usersHavePermission(toChannel, authorAndBot, [
         'SEND_MESSAGES',
         'VIEW_CHANNEL',
      ])
   ) {
      await interaction.reply(
         `One of us not have access to send messages in <#${toChannel.id}>`
      );
      return null;
   }

   if (
      !usersHavePermission(fromChannel, authorAndBot, [
         'MANAGE_MESSAGES',
         'VIEW_CHANNEL',
      ])
   ) {
      await interaction.reply(
         `One of us not have access to delete messages in <#${fromChannel.id}>`
      );
      return null;
   }

   // INFO: single message; not a range
   if (!endId) {
      await toChannel.sendTyping();
      await toChannel.send(`__1 message moved from__ <#${fromChannel.id}>`);

      await moveMessage(toChannel, startMsg);

      await interaction.reply({ content: '1 message moved.' });

      return null;
   }

   // INFO: for more than one message

   let endMsg;

   try {
      endMsg = await fromChannel.messages.fetch(endId);
   } catch (err) {
      await interaction.reply(
         'End message is not in the same channel as start message.'
      );

      return null;
   }

   const [msgs, stoppedEarly] = await getMessagesInRange(
      fromChannel,
      startMsg,
      endMsg
   );

   toChannel.sendTyping();
   await toChannel.send(
      `__${msgs.length} messages moved from__ <#${fromChannel.id}>`
   );

   await interaction.reply('Working on it');

   // DOUBT: no idea what is this for
   const oldToNewMessageMapping = {};
   for (let i = 0; i < msgs.length; i++) {
      const msg = msgs[i];
      const newMessage = await moveMessage(
         toChannel,
         msg
         // msg.reference.messageId
         //    ? oldToNewMessageMapping[msg.reference.messageId]
         //    : undefined
      );

      oldToNewMessageMapping[msg.id] = newMessage;
   }

   await interaction.editReply(
      `Moved ${msgs.length} messages. ${
         stoppedEarly
            ? '\nNote: Some messages in the range were not included due to a rate limit precaution.'
            : ''
      }`
   );

   // INFO: these are not needed, but need to do some refactoring
   // const confirmPrompt = `Are you sure you want to move ${
   //    msgs.length
   // } messages to <#${toChannel.id}>?${
   //    stoppedEarly
   //       ? '\nNote: Some messages in the range were not included due to a rate limit precaution.'
   //       : ''
   // }`;

   // const workingMessage = `Moving ${msgs.length} messages to <#${toChannel.id}>...`;

   // const res = {
   //    intermediateResult: { msgs, toChannel, fromChannel },
   //    confirmPrompt,
   //    workingMessage,
   // };

   // return res;
};

module.exports = moveMessages;
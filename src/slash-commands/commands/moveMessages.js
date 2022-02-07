const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { getMessagesInRange } = require('../../discord-utils');

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

const moveMessages = async (interaction, CMD_NAME, options) => {
   const channelId = interaction.options.getChannel('to_channel', true).id;
   const startId = interaction.options.getString('start_message_id', true);
   const endId = interaction.options.getString('end_message_id');

   const toChannel = await interaction.guild.channels.fetch(channelId);
   if (!toChannel || !toChannel.isText()) {
      interaction.editReply(`Could not resolve toChannel: <#${channelId}>`);
      return null;
   }

   const [startMsg, fromChannel] = await findMessageInGuild(
      startId,
      interaction.guild,
      interaction.channel
   );

   if (!startMsg || !fromChannel) {
      await interaction.editReply('Could not find starting message.');
      return null;
   }

   if (toChannel.id === fromChannel.id) {
      await interaction.editReply(
         "You're moving messages to the same channel??"
      );
      return null;
   }

   const { author } = await getInfoFromCommandInteraction(interaction, {
      ephemeral: true,
   });

   if (!author) {
      await interaction.editReply(
         'Could not find who is invoking this command.'
      );
      return null;
   }

   const authorAndBot = filterOutFalsy([author, client.user]);

   // permission, need to fix
   // if (
   //    !usersHavePermission(toChannel, authorAndBot, [
   //       'SEND_MESSAGES',
   //       'VIEW_CHANNEL',
   //    ])
   // ) {
   //    await interaction.editReply(
   //       `One of us not have access to send messages in <#${toChannel.id}>`
   //    );
   //    return null;
   // }

   // if (
   //    !usersHavePermission(fromChannel, authorAndBot, [
   //       'MANAGE_MESSAGES',
   //       'VIEW_CHANNEL',
   //    ])
   // ) {
   //    await interaction.editReply(
   //       `One of us not have access to delete messages in <#${fromChannel.id}>`
   //    );
   //    return null;
   // }

   // single message; not a range
   if (!endId) {
      await toChannel.sendTyping();
      await toChannel.send(`__Messages moved from__ <#${fromChannel.id}>`);
      // await moveMessage(toChannel, startMsg);
      await interaction.editReply({ content: '1 message moved.' });
      return null;
   }

   // for more than one message

   // let endMsg;

   // try {
   //    endMsg = await fromChannel.messages.fetch(endId);
   // } catch (err) {
   //    await interaction.editReply(
   //       'End message is not in the same channel as start message.'
   //    );
   //    return null;
   // }

   // const [msgs, stoppedEarly] = await getMessagesInRange(
   //    fromChannel,
   //    startMsg,
   //    endMsg
   // );

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

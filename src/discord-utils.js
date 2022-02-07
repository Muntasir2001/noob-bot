export const getMessagesInRange = async (channel, start, end) => {
   if (start.createdTimestamp > end.createdTimestamp) {
      const temp = start;
      start = end;
      end = temp;
   }

   let stoppedEarly = true;
   const msgs = [start];
   while (msgs.length < MAX_MESSAGES_FETCH) {
      const fetchedMsgs = Array.from(
         (
            await channel.messages.fetch({
               // cannot also provide the "before: end.id" option since multiple options are not supported by the API
               after: start.id,
               limit: BULK_MESSAGES_LIMIT,
            })
         ).values()
      ).reverse(); // reverse so the messages are ordered chronologically

      const indexOfEndMsg = fetchedMsgs.findIndex((msg) => msg.id === end.id);

      if (indexOfEndMsg === -1) {
         // haven't reached the end message yet, so add messages and keep fetching for more
         msgs.push(...fetchedMsgs);
         start = fetchedMsgs[fetchedMsgs.length - 1];
      } else {
         // found the end message, so add messages (ignoring ones after end message) and stop fetching
         msgs.push(...fetchedMsgs.slice(0, indexOfEndMsg + 1));
         stoppedEarly = false;
         break;
      }
   }
   return [msgs, stoppedEarly];
};

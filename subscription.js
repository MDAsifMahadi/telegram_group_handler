// subscription.js
import { CHANNEL_USERNAME } from './config.js';
export async function checkSubscription(bot, userId, chatId, messageId) {
  try {
    const member = await bot.getChatMember(CHANNEL_USERNAME, userId);
    if (['member', 'administrator', 'creator'].includes(member.status)) {
      return true; // সাবস্ক্রাইব আছে
    } else {
      await bot.deleteMessage(chatId, messageId);
      const sentMsg = await bot.sendMessage(
        chatId,
        "🚫 To send messages in this group, you must subscribe first.",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📢 Subscribe",
                  url: `https://t.me/${CHANNEL_USERNAME.replace("@", "")}`,
                },
              ],
            ],
          },
        }
      );

      setTimeout(() => {
        bot.deleteMessage(chatId, sentMsg.message_id).catch(() => {});
      }, 10000);

      return false;
    }
  } catch (err) {
    // যদি ইউজার চ্যানেলে না থাকে
    await bot.deleteMessage(chatId, messageId);
     const sentMsg = await bot.sendMessage(
        chatId,
        "🚫 To send messages in this group, you must subscribe first.",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📢 Subscribe",
                  url: `https://t.me/${CHANNEL_USERNAME.replace("@", "")}`,
                },
              ],
            ],
          },
        }
      );
      setTimeout(() => {
        bot.deleteMessage(chatId, sentMsg.message_id).catch(() => {});
      }, 10000);
    return false;
  }
}
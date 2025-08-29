// index.js
import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN } from './config.js';
import { checkSubscription } from './subscription.js';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // শুধু গ্রুপ মেসেজের জন্য চেক
  if (msg.chat.type === 'supergroup' || msg.chat.type === 'group') {
    const userId = msg.from.id;
    await checkSubscription(bot, userId, chatId, msg.message_id);
  }
});

console.log('Bot is running...');

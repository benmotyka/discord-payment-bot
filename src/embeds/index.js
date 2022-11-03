import { EmbedBuilder } from "discord.js";

const embedColors = 0x0099ff;

export const initializeEmbed = new EmbedBuilder()
  .setColor(embedColors)
  .setTitle("Fast payment")
  .setDescription("To start a payment react with 💸")
  .setFooter({ text: "Maślak3000 - discord payment bot" });

export const transactionInstructionsEmbed = new EmbedBuilder()
  .setColor(embedColors)
  .setTitle("Payment instructions")
  .setDescription("Please click ➡️ button to start payment")
  .setFooter({
    text: "If you have any questions or concerns, feel free to mention moderators in this channel. You can cancel this payment anytime by pressing ❌",
  });

export const cancelTransactionEmbed = new EmbedBuilder()
  .setColor(embedColors)
  .setDescription(`Transaction canceled. Deleting channel in 10 seconds...`);

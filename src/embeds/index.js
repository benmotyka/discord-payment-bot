import { EmbedBuilder } from "discord.js";

const primaryColor = 0x0099ff;

export const initializeEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setTitle("Fast payment")
  .setDescription("To start a payment react with 💸")
  .setFooter({ text: "Maślak3000 - discord payment bot" });

export const transactionInstructionsEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setTitle("Payment instructions")
  .setDescription("Please click ➡️ button to start payment")
  .setFooter({
    text: "If you have any questions or concerns, feel free to mention moderators in this channel. You can cancel this payment anytime by pressing ❌",
  });

export const cancelTransactionEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setDescription(`Transaction canceled. Deleting channel in 10 seconds...`);

export const getConfigurationEmbed = ({ currentConfiguration }) =>
  new EmbedBuilder()
    .setColor(primaryColor)
    .setDescription(
      currentConfiguration
        ? `Your current configuration is: ${currentConfiguration}.\n\nWould you like to change it?`
        : `You don't have any configuration yet. Press ⚙️ below to start`
    );

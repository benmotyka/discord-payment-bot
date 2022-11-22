import { EmbedBuilder } from "discord.js";

const primaryColor = 0x0099ff;

export const initializeEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setTitle("Fast payment")
  .setDescription("To start a payment react with 💸")
  .setFooter({ text: "Maślak3000 - discord payment bot" });

export const interactionInstructionsEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setTitle("Payment instructions")
  .setDescription("Please click ➡️ button to start payment")
  .setFooter({
    text: "If you have any questions or concerns, feel free to mention moderators in this channel. You can cancel this payment anytime by pressing ❌",
  });

export const serverConfigurationInstructionsEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setTitle("Server configuration instructions")
  .setDescription(
    "Please send a new message to this channel, containing the list of short cryptocurrency names that you want to work with, separated with comma."
  )
  .setFooter({
    text: 'For example: "BTC,ETH,LTC"',
  });

export const cancelInteractionEmbed = new EmbedBuilder()
  .setColor(primaryColor)
  .setDescription(`Transaction canceled. Deleting channel...`);

export const getConfigurationEmbed = ({ currentConfiguration }) =>
  new EmbedBuilder()
    .setColor(primaryColor)
    .setDescription(
      currentConfiguration
        ? `Your current server configuration is: ${currentConfiguration.serverId} and has been created on: ${currentConfiguration.createdAt}.\n\nWould you like to change it?`
        : `Your server doesn't have any configuration yet. Press ⚙️ below to start`
    );

import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { customIds } from "../config/interactions.js";

export default {
  name: "initialize",
  description: "Initializes bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    // Create styled message
    const embedMessage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Fast payment")
      .setDescription("To start a payment react with 💸")
      .setFooter({ text: "Maślak3000 - discord payment bot" });

    // Create buttons under message
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.startTransaction)
        .setLabel("💸 Pay now")
        .setStyle(ButtonStyle.Secondary)
    );

    interaction.channel.send({
      embeds: [embedMessage],
      components: [buttons],
    });
  },
};

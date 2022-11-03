import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { customIds } from "../config/interactions.js";
import { initializeEmbed } from "../embeds/index.js"

export default {
  name: "initialize",
  description: "Initializes bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    // Create buttons under message
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.startTransaction)
        .setLabel("💸 Pay now")
        .setStyle(ButtonStyle.Secondary)
    );

    interaction.reply({
      embeds: [initializeEmbed],
      components: [buttons],
    });
  },
};

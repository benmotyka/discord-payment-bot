import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { customIds } from "../config/interactions.js";
import { getConfigurationEmbed } from "../embeds/index.js";

export default {
  name: "configure",
  description: "Configures bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    //   TODO: add only for channel owner
    // Create buttons under message
    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(customIds.startConfiguration)
          .setLabel("⚙️ Start configuring")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(customIds.cancelConfiguration)
          .setLabel("❌ Cancel")
          .setStyle(ButtonStyle.Secondary)
      );

    await interaction.reply({
      embeds: [getConfigurationEmbed({currentConfiguration: null})],
      components: [buttons],
      ephemeral: true,
    });
  },
};

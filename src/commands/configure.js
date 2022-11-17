import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { customIds } from "../config/interactions.js";
import { getConfigurationEmbed } from "../embeds/index.js";

export default {
  name: "configure",
  description: "Configures bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    // Check if command is invoked by server owner
    if (interaction.guild.ownerId !== interaction.member.user.id) {
      await interaction.reply({
        content: "Command is available only for server owner",
        ephemeral: true,
      });
    }

    // Create buttons under response
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.startConfiguration)
        .setLabel("⚙️ Start configuring")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [getConfigurationEmbed({ currentConfiguration: null })],
      components: [buttons],
      ephemeral: true,
    });
  },
};

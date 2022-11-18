import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { customIds } from "../config/interactions.js";
import { initializeEmbed } from "../embeds/index.js";
import { getServerConfiguration } from "../services/server.js";

export default {
  name: "initialize",
  description: "Initializes bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    // Check if command is invoked by server owner
    if (interaction.guild.ownerId !== interaction.member.user.id) {
      await interaction.reply({
        content: "Command is available only for server owner",
        ephemeral: true,
      });
    }

    const serverConfiguration = await getServerConfiguration(
      interaction.guildId
    );

    if (!serverConfiguration) {
      return await interaction.reply({
        content: `Server not configured, please use \`/configure\` command first`,
        ephemeral: true,
      });
    }
    // Create buttons under message
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.startTransaction)
        .setLabel("💸 Pay now")
        .setStyle(ButtonStyle.Secondary)
    );

    return await interaction.reply({
      embeds: [initializeEmbed],
      components: [buttons],
    });
  },
};

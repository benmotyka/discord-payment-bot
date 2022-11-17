import { createServerConfiguration } from "../services/server.js";

export const startConfiguration = async (interaction) => {
  await createServerConfiguration({
    discordId: interaction.guildId,
  });

  await interaction.reply({
    content: "Config saved successfully",
    ephemeral: true,
  });
};

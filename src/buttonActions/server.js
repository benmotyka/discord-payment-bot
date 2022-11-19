import Discord from "discord.js";
import {
  serverConfigurationInstructionsEmbed,
} from "../embeds/index.js";
import { createServerConfiguration } from "../services/server.js";

export const startConfiguration = async (interaction) => {
  const channelName = "DISCORD_BOT_CONFIGURATION";

  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.name === channelName
  );
  if (existingChannel) {
    return await interaction.reply({
      content: `Configuration is in progress, please proceed to it (${existingChannel.toString()})`,
      ephemeral: true,
    });
  }

  const createdChannel = await interaction.guild.channels.create({
    name: channelName,
    type: Discord.ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [Discord.PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: interaction.user.id,
        allow: [Discord.PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });

  await createServerConfiguration({
    discordId: interaction.guildId,
  });

  await createdChannel.send({
    content: `${interaction.user}`,
    embeds: [serverConfigurationInstructionsEmbed],
  });

  await interaction.reply({
    content: `Configuration started, please proceed to it: ${createdChannel.toString()}`,
    ephemeral: true,
  });
};

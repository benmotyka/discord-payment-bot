import Discord, {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { customIds } from "../config/interactions.js";
import { serverConfigurationInstructionsEmbed } from "../embeds/index.js";
import { createServerConfiguration } from "../services/server.js";

export const startConfiguration = async (interaction) => {
  const channelName = "DISCORD_BOT_CONFIGURATION";

  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
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

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(customIds.cancelConfiguration)
      .setLabel("❌ Cancel")
      .setStyle(ButtonStyle.Secondary)
  );

  await createdChannel.send({
    content: `${interaction.user}`,
    embeds: [serverConfigurationInstructionsEmbed],
    components: [buttons],
  });

  await interaction.reply({
    content: `Configuration started, please proceed to it: ${createdChannel.toString()}`,
    ephemeral: true,
  });
};

export const cancelConfiguration = async (interaction) => {
  if (interaction.guild.ownerId !== interaction.member.user.id) {
    return await interaction.reply({
      content: "Command is available only for server owner",
      ephemeral: true,
    });
  }

  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.id === interaction.channelId
  );

  existingChannel.delete().catch((error) => {
    console.log("error in deleting channel", error);
  });
};

import Discord, {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import {
  createInteraction,
  getInteractionDetails,
  softDeleteInteraction,
} from "../services/interaction.js";
import { customIds } from "../config/interactions.js";
import {
  interactionInstructionsEmbed,
  cancelInteractionEmbed,
} from "../embeds/index.js";

export const startTransaction = async (interaction) => {
  const channelName =
    interaction.user.username + interaction.user.discriminator;
  // Check if channel already exists
  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.name === channelName
  );
  if (existingChannel) {
    return await interaction.reply({
      content: `Channel already exists, please proceed to it (${existingChannel.toString()})`,
      ephemeral: true,
    });
  }

  // Create private channel
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

  await createInteraction({
    channelName,
    channelId: createdChannel.id,
    serverId: interaction.guildId,
    userId: interaction.user.id,
  });

  // Create buttons under message
  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.confirmTransaction)
        .setLabel("➡️ Confirm payment")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(customIds.cancelInteraction)
        .setLabel("❌ Cancel")
        .setStyle(ButtonStyle.Secondary)
    );

  await createdChannel.send({
    content: `Welcome ${interaction.user}`,
    embeds: [interactionInstructionsEmbed],
    components: [buttons],
  });

  // Reply to user
  await interaction.reply({
    content: `Created channel, please proceed to make a payment (${createdChannel.toString()})`,
    ephemeral: true,
  });
};

export const cancelInteraction = async (interaction) => {
  const channelName =
    interaction.user.username + interaction.user.discriminator;
  // Check if channel already exists
  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.name === channelName
  );
  const existingInteraction = await getInteractionDetails(
    interaction.channelId
  );
  if (existingInteraction.deletedAt) {
    return await interaction.reply({
      content: "**Warning**: Interaction already canceled",
      ephemeral: true,
    });
  }
  await softDeleteInteraction(interaction.channelId);

  setTimeout(() => {
    existingChannel.delete().catch((error) => {
      console.log("error in deleting channel", error);
    });
  }, 10_000);

  await interaction.reply({
    embeds: [cancelInteractionEmbed],
  });
};

export const confirmTransaction = async (interaction) => {
  // await confirmUserTransaction({
  //   channelId: interaction.channelId,
  //   userId: interaction.user.id,
  // });

  await interaction.reply({
    content: `Transaction confirmed by: ${interaction.user}`,
  });
};


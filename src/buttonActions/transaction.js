import Discord, {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import {
  createTransaction,
  softDeleteTransaction,
  getTransactionDetailsByChannelId,
  confirmUserTransaction,
} from "../services/transaction.js";
import { customIds } from "../config/interactions.js";
import {
  transactionInstructionsEmbed,
  cancelTransactionEmbed,
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

  await createTransaction({
    channelId: createdChannel.id,
    guildId: interaction.guildId,
    userId: interaction.user.id,
    username: interaction.user.username,
    discriminator: interaction.user.discriminator,
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
        .setCustomId(customIds.cancelTransaction)
        .setLabel("❌ Cancel")
        .setStyle(ButtonStyle.Secondary)
    );

  await createdChannel.send({
    content: `Welcome ${interaction.user}`,
    embeds: [transactionInstructionsEmbed],
    components: [buttons],
  });

  // Reply to user
  await interaction.reply({
    content: `Created channel, please proceed to make a payment (${createdChannel.toString()})`,
    ephemeral: true,
  });
};

export const cancelTransaction = async (interaction) => {
  const channelName =
    interaction.user.username + interaction.user.discriminator;
  // Check if channel already exists
  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.name === channelName
  );
  const existingTransaction = await getTransactionDetailsByChannelId({
    channelId: interaction.channelId,
  });
  if (existingTransaction.deletedAt) {
    return await interaction.reply({
      content: "**Warning**: Transaction already canceled",
      ephemeral: true,
    });
  }
  await softDeleteTransaction({ channelId: interaction.channelId });

  setTimeout(() => {
    existingChannel.delete().catch((error) => {
      console.log("error in deleting channel", error);
    });
  }, 10_000);

  await interaction.reply({
    embeds: [cancelTransactionEmbed],
  });
};

export const confirmTransaction = async (interaction) => {
  await confirmUserTransaction({
    channelId: interaction.channelId,
    userId: interaction.user.id,
  });

  await interaction.reply({
    content: `Transaction confirmed by: ${interaction.user}`,
  });
};

export const startConfiguration = async (interaction) => {};

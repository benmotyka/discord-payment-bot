import Discord, {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import {
  createTransaction,
  softDeleteTransaction,
} from "../services/transaction.js";
import { customIds } from "../config/interactions.js";

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

  // Create styled message
  const embedMessagePaymentInstructions = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Payment instructions")
    .setDescription(
      "Please click ✅ button to initialize payment."
    )
    .setFooter({
      text: "If you have any questions or concerns, feel free to mention moderators in this channel. You can cancel this payment anytime by pressing ❌",
    });

  // Create buttons under message
  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("donePayment")
        .setLabel("✅ Done")
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
    embeds: [embedMessagePaymentInstructions],
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
  const embedMessageCancelTransaction = new EmbedBuilder()
    .setColor(0x0099ff)
    .setDescription(
      `Transaction canceled by: ${interaction.user}. Deleting channel in 10 seconds...`
    );

  setTimeout(() => {
    existingChannel.delete();
    softDeleteTransaction({ channelId: interaction.channelId });
  }, 10_000);

  await interaction.reply({
    embeds: [embedMessageCancelTransaction],
  });
};

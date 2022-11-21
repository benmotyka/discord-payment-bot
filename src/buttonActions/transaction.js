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
  // Check if channel already exists
  const existingChannel = interaction.guild.channels.cache.find(
    (channel) => channel.id === interaction.channelId
  );
  const existingInteraction = await getInteractionDetails(
    interaction.channelId
  );
  if (existingInteraction?.deletedAt) {
    return await interaction.reply({
      content: "**Warning**: Interaction already canceled",
      ephemeral: true,
    });
  }
  await softDeleteInteraction(interaction.channelId);

  // remove buttons from interaction message
  await interaction.message.edit({
    components: [],
  });

  // save all messages
  const messages = await existingChannel.messages.fetch({ limit: 500 });

  const channelHistory = {
    channel: {
      id: interaction.channelId,
      name: existingChannel.name,
    },
    guild: {
      id: interaction.guildId,
      name: existingChannel.guild.name,
    },
    messagesData: messages
    .map((message) => ({
      createdAt: message.createdTimestamp,
      content: message.content,
      user: {
        id: message.author.id,
        name: message.author.username + message.author.discriminator,
      },
    }))
    .sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt));,
  };

  console.log(JSON.stringify(channelHistory));

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

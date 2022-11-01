import Discord from "discord.js";
import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { createTransaction } from "../services/transaction.js";
import { customIds } from "../config/interactions.js";

export default {
  name: "interactionCreate", // Event name
  once: false, // multiple commands can be run
  async run(interaction, client) {
    if (interaction.isButton()) {
      const channelName =
        interaction.user.username + interaction.user.discriminator;
      // Check if channel already exists
      const existingChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === channelName
      );
      switch (interaction.customId) {
        case customIds.startTransaction:
          if (existingChannel) {
            return await interaction.reply({
              content: `Channel already exists, please proceed to it (${existingChannel.toString()})`,
              ephemeral: true,
            });
          }

          // Create private channel
          const channel = await interaction.guild.channels.create({
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

          // Create transaction in db
          await createTransaction(interaction.user.id);

          // Create styled message
          const embedMessagePaymentInstructions = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Payment instructions")
            .setDescription(
              "Please pay:\n\n0.01 BTC \n\nto wallet below: \n\n1EMQmtF2YWLG47PEbbrpHAtesJC1GjPf8s\n\nPress ✅ button once you do this\n"
            )
            .setFooter({
              text: "You can cancel this payment anytime by pressing ❌",
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

          await channel.send({
            content: `Welcome ${interaction.user}`,
            embeds: [embedMessagePaymentInstructions],
            components: [buttons],
          });

          // Reply to user
          await interaction.reply({
            content: `Created channel, please proceed to make a payment (${channel.toString()})`,
            ephemeral: true,
          });
          break;
        case customIds.cancelTransaction:
          const embedMessageCancelTransaction = new EmbedBuilder()
            .setColor(0x0099ff)
            .setDescription(
              `Transaction canceled by: ${interaction.user}. Deleting channel.`
            );

          await existingChannel.send({
            embeds: [embedMessageCancelTransaction],
          });
          break;
      }
    } else if (interaction.isCommand()) {
      // Find the command that user entered in the client commands
      const command = client.commands.find(
        (cmd) => cmd.name == interaction.commandName
      );

      // Check if this command has a cooldown saved
      if (!client.cooldowns.has(command.name)) {
        // If not, create the cooldown collection
        client.cooldowns.set(command.name, new Discord.Collection());
      }

      // Get all user cooldowns for this command
      const timestamps = client.cooldowns.get(command.name);
      // Get the cooldown time for this command in MS
      const cooldownAmount = command.cooldown || 0;

      // Is this user in the cooldowns time list?
      if (timestamps.has(interaction.user.id)) {
        // When did/does the user's cooldown expire?
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;
        // Has it expired yet?
        if (Date.now() < expirationTime) {
          // If not, how long is left?
          const timeLeft = (expirationTime - Date.now()) / 1000;
          return interaction.reply(
            "Whoops, you are on cooldown for this command for another " +
              timeLeft +
              " seconds."
          ); // Return an error message
        }
      }
      // Put the user on cooldown
      timestamps.set(interaction.user.id, Date.now());

      // Run the command's function
      if (command) return command.run(interaction, client);
    }
  },
};

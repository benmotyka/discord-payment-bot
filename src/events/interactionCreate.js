import Discord from "discord.js";
import { customIds } from "../config/interactions.js";
import {
  startTransaction,
  cancelInteraction,
  confirmTransaction,
} from "../buttonActions/transaction.js";
import {
  cancelConfiguration,
  startConfiguration,
} from "../buttonActions/server.js";

export default {
  name: "interactionCreate", // Event name
  once: false, // multiple commands can be run
  async run(interaction, client) {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case customIds.startTransaction:
          await startTransaction(interaction);
          break;
        case customIds.cancelInteraction:
          await cancelInteraction(interaction);
          break;
        case customIds.confirmTransaction:
          await confirmTransaction(interaction);
          break;
        case customIds.startConfiguration:
          await startConfiguration(interaction);
          break;
        case customIds.cancelConfiguration:
          await cancelConfiguration(interaction);
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
          return interaction.reply({
            content:
              "Whoops, you are on cooldown for this command for another " +
              timeLeft +
              " seconds.",
            ephemeral: true,
          });
        }
      }
      // Put the user on cooldown
      timestamps.set(interaction.user.id, Date.now());

      // Run the command's function
      if (command) return command.run(interaction, client);
    }
  },
};

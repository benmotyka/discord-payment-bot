const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate", // Event name
  once: false, // multiple commands can be run
  async run(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId === "payNow") {
        // Create unique channel name
        const channelName =
          interaction.user.username + interaction.user.discriminator;
        // TODO: check if channel exists, if it does, send ephemeral message

        // Create channel and invite user to it
        interaction.guild.channels.create({
          name: channelName,
          type: Discord.ChannelType.GuildText,
        });

        // Reply to user
        await interaction.reply({
          content: "Created channel, please proceed to make a payment",
          ephemeral: true,
        });
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

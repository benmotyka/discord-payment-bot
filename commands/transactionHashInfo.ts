import DiscordJS from "discord.js";

export default ({
  commands,
  client,
}: {
  commands: any;
  client: DiscordJS.Client;
}) => {
  commands?.create({
    name: "transaction-hash-info",
    description: "Provides information about transaction hash for given crypto",
    options: [
      {
        name: "hash",
        description: "Hash of blockchain transaction",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    if (commandName !== "transaction-hash-info") return;

    const hash = options.getString("hash");
    if (!hash) {
      await interaction.reply({
        content: "Invalid hash",
        ephemeral: true,
      });
      return;
    }

    return interaction.reply({
      content: `Balance for hash address
      `,
      ephemeral: true,
    });

  });
};

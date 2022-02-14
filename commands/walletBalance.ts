import DiscordJS, { Intents, ClientOptions } from "discord.js";
import getCryptoByWallet from "../util/getCryptoByWallet";

import { getBalance } from "../api/blockcypher";
export default ({
  commands,
  client,
}: {
  commands: any;
  client: DiscordJS.Client;
}) => {
  commands?.create({
    name: "wallet-balance",
    description: "Checks balance of given wallet",
    options: [
      {
        name: "wallet",
        description: "Wallet address",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    if (commandName !== "wallet-balance") return;

    const wallet = options.getString("wallet");
    if (!wallet) {
      await interaction.reply({
        content: "Invalid wallet",
        ephemeral: true,
      });
      return;
    }

    const crypto = getCryptoByWallet(wallet);
    if (!crypto) {
      await interaction.reply({
        content: "Invalid crypto (only BTC)",
        ephemeral: true,
      });
      return;
    }

    const balance = await getBalance({ wallet, crypto });

    return interaction.reply({
      content: `Balance for wallet address: ${wallet} seems to be: ${balance} ${crypto}
      `,
      ephemeral: true,
    });

  });
};

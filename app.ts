import DiscordJS, { GatewayIntentBits, ClientOptions } from "discord.js";
import dotenv from "dotenv";
import walletBalance from "./commands/walletBalance";
import transactionHashInfo from "./commands/transactionHashInfo";
dotenv.config();

const options: ClientOptions = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};

const client = new DiscordJS.Client(options);

client.on("ready", () => {
  console.log("Bot is ready");
  const testGuildId = "937773501480316958";
  const guild = client.guilds.cache.get(testGuildId);
  const commands = guild ? guild.commands : client.application?.commands;

//   walletBalance({
//     commands,
//     client,
//   });

//   transactionHashInfo({
//     commands,
//     client,
//   });
});

client.login(process.env.TOKEN);

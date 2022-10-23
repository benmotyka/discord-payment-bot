import { GatewayIntentBits, ClientOptions } from "discord.js";

export const BotClientOptions: ClientOptions = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};
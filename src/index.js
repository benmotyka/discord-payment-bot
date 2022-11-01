import Discord from "discord.js";
import fs from "fs";
import { join } from "path";
import { config } from "dotenv";
import { connectDatabase } from "./config/db.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandsDir = join(__dirname, "./commands");
const eventsDir = join(__dirname, "./events");

const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync(eventsDir)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const { default: command } = await import(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const { default: event } = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.run(...args, client));
  } else {
    client.on(event.name, (...args) => event.run(...args, client));
  }
}

connectDatabase()
  .then(() => {
    client.login(process.env.TOKEN);
  })
  .catch((error) => {
    console.error("Couldnt connect to db!", error);
  });

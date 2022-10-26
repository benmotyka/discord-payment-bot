const Discord = require("discord.js");
const fs = require("fs");
const { join } = require("path");
const { config } = require("dotenv");
config();

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds],
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandsDir = join(__dirname, "./commands");
const eventsDir = join(__dirname, "./events");

const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync(eventsDir)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.run(...args, client));
  } else {
    client.on(event.name, (...args) => event.run(...args, client));
  }
}

client.login(process.env.TOKEN);

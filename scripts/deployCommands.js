const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { config } = require("dotenv");
config();

const clientId = "937772843876368424";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot's ping!"),
  new SlashCommandBuilder()
    .setName("initialize")
    .setDescription("Initializes bot"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

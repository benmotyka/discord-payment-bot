import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";

config();

const clientId = "937772843876368424";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot's ping!"),
  new SlashCommandBuilder()
    .setName("initialize")
    .setDescription("Initializes bot"),
  new SlashCommandBuilder()
    .setName("configure")
    .setDescription("Configures bot"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

import DiscordJS, { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export const execute = async (interaction: DiscordJS.CommandInteraction) => {
  await interaction.reply("Pong!");
};


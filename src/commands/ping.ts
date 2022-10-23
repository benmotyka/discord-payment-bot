import DiscordJS, { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!"),
  execute: async (interaction: DiscordJS.CommandInteraction) => {
    await interaction.reply("Pong!")
}
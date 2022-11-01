export default {
  name: "ping",
  description: "Get the bot ping",
  cooldown: 1000,
  async run(interaction, client) {
    interaction.reply({ content: client.ws.ping.toString() + "ms" });
  },
};

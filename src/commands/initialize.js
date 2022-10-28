const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "initialize",
  description: "Initializes bot",
  cooldown: 1000 * 10,
  async run(interaction) {
    // Create styled message
    const embedMessage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Fast payment")
      .setDescription("To start a payment react with 💸")
      .setFooter({text: "Maślak3000 - discord payment bot"})

    // Create buttons under message
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("payNow")
        .setLabel("Pay now 💸")
        .setStyle(ButtonStyle.Secondary)
    );

    // Reply to command, can also use
    // interaction.channel.send
    interaction.reply({
      embeds: [embedMessage],
      components: [buttons],
    });
  },
};

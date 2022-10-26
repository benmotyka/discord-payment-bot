module.exports = {
    name: "initialize",
    description: "Initializes bot",
    cooldown: 1000 * 10,
    async run(interaction) {
      const message = await interaction.reply({ content: 'This is Payment Bot. Press icon below to pay' , fetchReply: true });
      message.react('💵')
    },
  };
  
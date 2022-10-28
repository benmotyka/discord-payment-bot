const Discord = require("discord.js");

module.exports = {
  name: "createchannel",
  description: "Creates channel and invites user",
  cooldown: 1000,
  async run(interaction, client) {
    console.log(interaction);
    const channelName =
      interaction.user.username + interaction.user.discriminator;
    interaction.guild.channels.create({
      name: channelName,
      type: Discord.ChannelType.GuildText,
    });
    await interaction.reply({
      content: "Created channel, please proceed to make a payment",
      ephemeral: true,
    });
  },
};

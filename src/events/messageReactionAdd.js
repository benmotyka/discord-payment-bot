const Discord = require("discord.js");

module.exports = {
  name: "messageReactionAdd",
  once: false,
  run(interaction, client) {
    if (!interaction.me || client.bot) return; // return if reaction was done by discord bot or to message not sent by discord bot
    console.log(interaction);
    console.log(client);
  },
};

// client example:
// {
//     id: '385362460003270657',
//     bot: false,
//     system: false,
//     flags: UserFlagsBitField { bitfield: 0 },
//     username: 'ben',
//     discriminator: '7619',
//     avatar: '3a9539141fe0c73f00436b21310f0ab9',
//     banner: undefined,
//     accentColor: undefined
//   }

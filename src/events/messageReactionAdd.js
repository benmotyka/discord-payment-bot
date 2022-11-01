import Discord from "discord.js";

export default {
  name: "messageReactionAdd",
  once: false,
  run(interaction, client, guild) {
    // return if reaction was done by discord bot or to message not sent by discord bot
    if (!interaction.me || client.bot) return;
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

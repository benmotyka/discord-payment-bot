import DiscordJS, { Intents, ClientOptions } from 'discord.js'
import dotenv from 'dotenv'
import walletBalance from "./commands/walletBalance"
import transactionHashInfo from "./commands/transactionHashInfo"
dotenv.config()

const options: ClientOptions = {
    // input for bot, f.e reactions, messages
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
};

const client = new DiscordJS.Client(options)

client.on('ready', () => {
    console.log('Bot is ready')
    const testGuildId = '937773501480316958'
    const guild = client.guilds.cache.get(testGuildId)
    const commands = guild ? guild.commands : client.application?.commands

    walletBalance({
        commands,
        client
    });

    transactionHashInfo({
        commands,
        client 
    })
})

client.login(process.env.TOKEN)
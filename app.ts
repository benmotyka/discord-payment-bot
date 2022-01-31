import DiscordJS, { Intents, ClientOptions } from 'discord.js'
import dotenv from 'dotenv'
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

    commands?.create({
        name: 'ping',
        description: 'Replies with pong'
    })

    commands?.create({
        name: 'checkvoucher',
        description: 'Checks status of voucher',
        options: [ //arguments
            {
                name: 'voucher',
                description: '32-digit voucher code',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.react('🤣')
        message.reply({
            content: 'pong'
        })
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return
    const {commandName, options} = interaction
    if (commandName === 'ping') interaction.reply({
        content: 'pong',
        ephemeral: true //only user who uses command can see it
    })
    else if (commandName === 'checkvoucher') {
        const voucher = options.getString('voucher')
        //const status = await axios.get('api/${voucher}')
        //const transactionHash = status.txHash
        const transactionHash = 'abcdef'
        await interaction.deferReply({
            ephemeral: true
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        await interaction.editReply({
            content: `The transaction hash of your voucher is: ${transactionHash}`
        })
    }
})

client.login(process.env.TOKEN)
import DiscordJS, { Intents, ClientOptions } from 'discord.js'

export default ({commands, client}: {commands: any, client: DiscordJS.Client}) => {
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

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return
        const {commandName, options} = interaction
        if (commandName === 'checkvoucher') {
            const voucher = options.getString('voucher')
    
            if (voucher?.length !== 32 && voucher?.length !== 17) {
                await interaction.reply({
                    content: 'All vouchers are 32 or 17 digits',
                    ephemeral: true
                })
                return
            }
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
}
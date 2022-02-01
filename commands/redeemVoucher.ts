import DiscordJS from 'discord.js'

export default ({commands, client}: {commands: any, client: DiscordJS.Client}) => {
    commands?.create({
        name: 'redeemvoucher',
        description: 'Redeems voucher',
        options: [ //arguments
            {
                name: 'voucher',
                description: '32-digit voucher code',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'wallet',
                description: 'Wallet for cryptocurrency',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return
        console.log(interaction)
        const {commandName, options} = interaction
        if (commandName === 'redeemvoucher') {
            const voucher = options.getString('voucher')
            const wallet = options.getString('wallet')
    
            if (voucher?.length !== 32 && voucher?.length !== 17) {
                await interaction.reply({
                    content: 'All vouchers are 32 or 17 digits',
                    ephemeral: true
                })
                return
            }

            if (!wallet?.includes('bc1')) {
                return await interaction.reply({
                    content: 'Invalid wallet',
                    ephemeral: true
                })
                
            }
            //const status = await axios.post('api/redeem/${voucher}')
            const transactionHash = 'voucher redeemed'
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
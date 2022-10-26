const Discord = require("discord.js")

module.exports = {
	name: 'interactionCreate', // Event name
	once: false, // multiple commands can be run
	run(interaction, client) { // Function to run on event fire
		if (!interaction.isCommand()) return; // Do not proceed if this isn't a command
		
		const commandName = interaction.commandName // Get the slash command name that they entered
		const command = client.commands.find(cmd => cmd.name == commandName); // Find it in the commands folder

		if (!client.cooldowns.has(command.name)) { // Check if this command has a cooldown saved
			client.cooldowns.set(command.name, new Discord.Collection()); // If not, create the cooldown collection
		}

		const timestamps = client.cooldowns.get(command.name); // Get all user cooldowns for this command 
		const cooldownAmount = (command.cooldown || 0); // Get the cooldown time for this command in MS

		if(timestamps.has(interaction.user.id)) { // Is this user in the cooldowns time list?
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount; // When did/does the user's cooldown expire?
			if(Date.now() < expirationTime) { // Has it expired yet?
				const timeLeft = (expirationTime - Date.now()) / 1000; // If not, how long is left?
				return interaction.reply("Whoops, you are on cooldown for this command for another " + timeLeft + " seconds.") // Return an error message
			}
		} // continue running if no errors

		timestamps.set(interaction.user.id, Date.now()); // Put the user on cooldown

		if(command) return command.run(interaction, client) // Run the command's function

	}
}
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./misc/config.json');
const fs = require('fs')

// Global Commands
const commandsPath = `${__dirname}/commands`;
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

var commands = [];
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data)
}


// Development commands
var developmentPath = `${__dirname}/development commands`;
const developmentFiles = fs.readdirSync(developmentPath).filter(file => file.endsWith('.js'));

var development = [];
for(const file of developmentFiles) {
	const command = require(`./development commands/${file}`);
	development.push(command.data)
}


const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log(`Successfully registered application commands for ${__dirname.split('\\').pop()}`))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: development })
	.then(() => console.log(`Successfully registered development commands for ${__dirname.split('\\').pop()}`))
	.catch(console.error);
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('../json/config.json');
const { on } = require('node:events');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("over my home server", { type: "WATCHING"});
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(token);

process.on("SIGINT", () => {
	client.destroy();
	console.log("Client Destroyed");
});
// The usual imports and such
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, PermissionFlagsBits, OAuth2Scopes, ActivityType, Events, Partials} = require('discord.js');
const { token } = require('./json/config.json');
const { channel } = require('node:diagnostics_channel');

// Create a client
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.DirectMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.DirectMessageTyping], partials: [Partials.Channel, Partials.Message] });

// Create a collection to store our commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

// Get each .js file from ./commands/ and import it using "require()"
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Listen for users starting an interaction through slash commands and interperet their request appropriately
client.on(Events.InteractionCreate, async interaction => {
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

// Listen for messages
// TODO: probably gotta figure out URI stuff in discord to get these.
client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;
	if (message.author.id != '508743147560370177') return;
	if (message.content.includes('i hate') | message.content.includes('i fucking hate')	| message.content.includes('i fuckin hate') | message.content.includes('suck'))
	{
		message.channel.send({ content: 'fuck you, literally fucking cope', reply: { messageReference: message.id } });
	}
	
});

// listen ONCE for the ready signal and log "Ready!" and set our status to "WATCHING over my home server"
client.once(Events.ClientReady, () => {
	console.log('Ready!');
	client.user.setActivity("over my home server", { type: ActivityType.Watching});

	const link = client.generateInvite({
		permissions: [
		  PermissionFlagsBits.Administrator,
		],
		scopes: [OAuth2Scopes.Bot,OAuth2Scopes.ApplicationsCommands,OAuth2Scopes.MessagesRead,OAuth2Scopes.MessageCreate,OAuth2Scopes.MessageContent],
	  });
	  console.log(`Generated bot invite link: ${link}`);

});


// Login... duh
client.login(token);

// Catch ^C and close somewhat gracefully i suppose?
process.on("SIGINT", () => {
	client.destroy();
	console.log("Client Destroyed");
});
const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');
const {
	token
} = require('./json/config.json');

const commands = [];

// Place your client and guild ids here
const { clientid } = require('./json/config.json');
const { guildid } = require('./json/config.json');




const rest = new REST({
	version: '9'
}).setToken(token);

(async () => {
	try {
		console.log('Started removing guild (/) commands.');

		await rest.put(Routes.applicationGuildCommands(clientid, guildid), {
			body: commands,
		});

		console.log('Successfully removed guild (/) commands.');
		
	} catch (error) {
		console.error(error);
	}
})();
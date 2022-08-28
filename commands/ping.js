const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping? Ping?! PING?!?!?!?!'),
	async execute(interaction) {
		await interaction.reply('Pong! *I guess....* :coffee:');
		await wait(6000);
		await interaction.editReply('<@'+interaction.user.id+'>' + ' is sussy wussy haha :flushed:');
		await wait(700);
		await interaction.editReply('Pong! *I guess....* :coffee:');
	},
};
const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

function insertSpaces(aString) {
	return aString.split("").join(" ");
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thicc')
		.setDescription("Cause who doesn't want thicc text?")
		.addStringOption(option =>
			option.setName('text')
			.setDescription('Text to Thiccify')
			.setRequired(true)
		),

	async execute(interaction) {
		try {
			const spacedstring = insertSpaces(interaction.options.getString('text'));
			await interaction.reply(`**:sparkles: ${spacedstring} :sparkles:**`);
		} catch (error) {
			await interaction.reply(`**:rage: How dare you try to break me! :rage:**`);
			await wait(3000);
			await interaction.editReply(`**but if ya need the info here it is (send this to <@508743147560370177> pls):** \n` + "`" + error + "`");
		}
	},
};
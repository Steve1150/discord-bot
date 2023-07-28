const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const { debug } = require('console');
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
		)
		.addStringOption(option =>
			option.setName('private')
			.setDescription('Do you want everyone to see this?')
			.setRequired(true)
		),

	async execute(interaction) {
		try {
			if(interaction.options.getString('private').toLowerCase() == 'true'){ privatedmsg = true }
			else{ privatedmsg = false }
			const spacedstring = insertSpaces(interaction.options.getString('text'));
			console.log(insertSpaces(interaction.options.getString('text')));
			console.log(spacedstring);
			await interaction.reply({content: `**:sparkles: ${spacedstring} :sparkles:**`, ephemeral: privatedmsg});
		} catch (error) {
			await interaction.reply({content: "**:scream: OH GOD SOMETHING WENT WRONG!!!! :scream:**", ephemeral: true});
			await wait(2500);
			await interaction.editReply({content: "**but seriously... If you need the info here it is (if not, send this to <@508743147560370177> pls):**\n**Time for the nasty:**\n" + "`" + error + "`", ephemeral: true});
		}
	},
};
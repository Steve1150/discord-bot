const {
	SlashCommandBuilder
} = require('@discordjs/builders');

jsonfile = (require("../json/rules.json"));
rulearray = []

for(i in jsonfile){
    rulearray.push(jsonfile[i]);
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Check the rules')
		.addIntegerOption(option =>
			option.setName('number')
			.setDescription('What rule should i pull up for ya?')
		),
	async execute(interaction) {
        rulenum = interaction.options.getInteger('number');
        ruletoshow = rulenum - 1;

        if(ruletoshow<=rulearray.length-1){
        await interaction.reply("**Rule " + rulenum + ": **" + rulearray[ruletoshow]);
        } else{
            await interaction.reply({content: "*That rule doesn't exist... Try to choose one that does next time, okay?*", ephemeral: true})
        };

	},
};
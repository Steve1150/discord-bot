const wait = require('node:timers/promises').setTimeout;

const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageAttachment} = require("discord.js")

const fetch = require("node-fetch");
configfile = require('../json/config.json');
apikey = configfile.catpikey;


//define the stuff we need to get our image... Kinda needed to make this a function as far as i know... Fuckin "async await" my ass
async function getimage() {
	const response = await fetch('https://api.thecatapi.com/v1/images/search', {
		headers: {
			"x-api-key": apikey
		},
		params:
		{}
	})
	const data = await response.json();
	const url = data[0].url;
	return url;
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Cause... Cats... *I had to ok?* but why are you asking anyway?')
		.addIntegerOption(option =>
			option.setName('amount')
			.setDescription('you obviously want more than 1... right?')
		),


	async execute(interaction) {
		let pics = [];
		numofpics = interaction.options.getInteger('amount');
		await interaction.reply({files:['https://c.tenor.com/thySfaLFwwAAAAAC/cat-meow-loading.gif']});

		if (numofpics < 6) { await wait(1000); console.log("We waited my guy!!!") };

		for (let i = 1; i <= numofpics; i += 1 ){
			
			//call our function to get an image... use ".then()" to use data from our ""promise"". Still not sure how they work tbh.
			await getimage().then(value => {
				//On success :) (ideally we want a file here but the url is totally acceptable since discord will just show the image if the link is direct to one, which it is)
				
				//start making an array i guess
				pics[pics.length] = value;

				if (i==numofpics){

					interaction.editReply({
						files: pics,
						content: 'Cat photos have arrived!'
					});

				};

			},reason => {
				//On failure :( send the error in a discord message... Might not be plesant for the avg user but whatever who cares.
				
				interaction.editReply({content: reason, ephemeral: true});
			});
		};
		//once we have our array, make string and send urls in A SINGLE MESSAGE FOR FUCK SAKE DISCORD I SWEAR TO GO-
	},
};
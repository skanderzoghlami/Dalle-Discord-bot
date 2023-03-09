const { SlashCommandBuilder } = require('discord.js');
const { openai_token } = require('../config.json');
const axios = require('axios');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('usopp')
		.setDescription('Draw a pictre for me !')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('The description')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		answer = 'hmmm';

		prompt = interaction.options.getString('prompt')


		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${openai_token}`
			}
		};
		const data = {
			prompt: prompt,
			n: 1,
			size: "1024x1024"
		};
		axios.post('https://api.openai.com/v1/images/generations', data, config)
			.then(response => {
				interaction.editReply(response.data.data[0].url);
			})
			.catch(error => {
				interaction.editReply(error);
			});






	},
};
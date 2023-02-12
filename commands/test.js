const { update } = require("../misc/libs");

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('dev test'),
	args: ["connection"],
	
	async execute(interaction, args) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);

		const userID = interactionUser.id;

        connection = args;

        update(interaction, connection, userID)
	},
};
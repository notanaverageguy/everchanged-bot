const { update } = require("../misc/libs");

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editstats')
		.setDescription('Edits player stats')
        .addStringOption(option =>
            option.setName('stat')
                .setDescription('Which stat to edit')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('num')
                .setDescription('Number to set')
                .setRequired(true)),

	args: ["connection"],
	
	async execute(interaction, args) {
		const config = require('../misc/config.json')
		if(!interaction.user.id == config.owner) {
				interaction.reply({ content: 'Must be naag to use this command', ephemeral: true})
				console.log(`${interaction.user.username}#${interaction.user.discriminator} attempted to edit stats`)
				return;
        };

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const userID = interactionUser.id;
        const options = interaction.options["_hoistedOptions"];
        connection = args;
        const accepted_values = ["credits","cps","dirt","stone","lapis","copper","iron","redstone","gold","diamond","emerald","netherite","rebirth", "estrogen","prestige"];
        if(accepted_values.includes(options[0].value)) {
            connection.query(`UPDATE people SET ${options[0].value} = ${options[1].value} WHERE UUID = ${userID}`, function (error, results, fields) {if (error) throw error;});
            interaction.reply({ content: `Success`, ephemeral: true });
        } else {
            interaction.reply({ content: `\`${options[0].value}\` doesn't exist in database`, ephemeral: true });
        }
	},
};
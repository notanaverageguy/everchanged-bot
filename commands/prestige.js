const { update, createProfile, query } = require("../misc/libs");

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prestige')
		.setDescription('Prestiges the player'),
	args: ["connection"],
	
	async execute(interaction, args) {
        const interactionUser = await interaction.user
		const username = interactionUser.username;
		const userID = interactionUser.id;
        const user = {username: username, userID: userID}
        connection = args;
        
        update(interaction, connection, userID);

        setTimeout(() => {

            query(connection, 'SELECT * FROM people')
            .then((results) => {
                if(!results.length) {
                    createProfile(interaction, connection, user);
                    return;
                }
                results = results[0];
                const rebirths = results.rebirth;
                const prestiges = results.prestige;

                if(rebirths < prestiges * 5 + 50) { interaction.reply({content: "Please rebirth instead of prestiging", ephemeral: true}); return }

                query(connection, `UPDATE people SET credits = 0, cps = 1, dirt = 1, stone = 0, copper = 0, iron = 0, redstone = 0, lapis = 0, gold = 0, diamond = 0, emerald = 0, netherite = 0, estrogen = 0, rebirth = 0, prestige = ${prestiges + 1}, lastupdated = ${Date.now()/1000} WHERE UUID = ${userID}`).then((results) => {}).catch((error) => {console.log(error)});
                interaction.reply({content: `Successfully prestiged`, ephemeral: true});
            }).catch((error) => {console.log(error)});
        }, 100)
	},
};
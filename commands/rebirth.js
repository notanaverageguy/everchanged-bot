const { update, createProfile, query } = require("../misc/libs");

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rebirth')
		.setDescription('Rebirths the player'),
	args: ["connection"],
	
	async execute(interaction, args) {
        const interactionUser = await interaction.user
		const username = interactionUser.username;
		const userID = interactionUser.id;
        const user = {username: username, userID: userID}
        connection = args;
        
        update(interaction, connection, userID);

        setTimeout(() => {
            query(connection, `SELECT * FROM PEOPLE WHERE UUID="${userID}"`)
            .then((results) => {
                results = results[0];
                if(!results) {
                    createProfile(interaction, connection, user);
                    return;
                }

                const credits = results.credits;
                const rebirths = results.rebirth;
                const prestiges = results.prestige;

                if(rebirths >= prestiges * 5 + 50) { interaction.reply({content: "Please prestige instead of rebirthing", ephemeral: true}); return }
                if(credits <= 2_000_000_000 * (rebirths + 1)) { interaction.reply({content: `Not enough credits to rebirth (${(rebirths + 1) * 200000000000 - credits} needed)`, ephemeral: true}); return }

                query(connection, `UPDATE people SET credits = 0, cps = 1, dirt = 1, stone = 0, copper = 0, iron = 0, redstone = 0, lapis = 0, gold = 0, diamond = 0, emerald = 0, netherite = 0, estrogen = 0, rebirth = ${rebirths + 1}, lastupdated = ${Date.now()/1000} WHERE UUID = ${userID}`).then((results) => {}).catch((error) => {console.log(error)});                interaction.reply({content: `Successfully rebirthed`, ephemeral: true});
            }).catch((error) => {console.log(error)});
        }, 100)
	},
};
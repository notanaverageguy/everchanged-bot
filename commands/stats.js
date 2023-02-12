const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { update, createProfile, query } = require("../misc/libs");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows user stats'),
	args: ["connection"],
	
	async execute(interaction, args) {
        interaction.user.username
        const interactionUser = await interaction.user
		const username = interactionUser.username;
		const userID = interactionUser.id;
        const user = {username: username, userID: userID}
        connection = args;

        update(interaction, connection, userID);
        setTimeout(() => {
            query(connection, `SELECT * FROM PEOPLE WHERE UUID="${userID}"`)
            .then((results) => {
                if(!results.length) {
                    createProfile(interaction, connection, user);
                    return;
                }
                results = results[0];

                const credits = results["credits"];
                const cps = results["cps"];
                const rebirths = results["rebirth"];
                const prestiges = results["prestige"];
                const dirt = results["dirt"];
                const stone = results["stone"];
                const copper = results["copper"];
                const iron = results["iron"];
                const redstone = results["redstone"];
                const lapis = results["lapis"];
                const gold = results["gold"];
                const diamond = results["diamond"];
                const emerald = results["emerald"];
                const netherite = results["netherite"];
                const estrogen = results["estrogen"];

                const multiplier = (prestiges*0.1)*(rebirths+1)+(rebirths+1);
                const player_embed = new EmbedBuilder()
                
                .setColor("0x00FFFF")
                .setTitle(`Stats for ${username}`)
                .setAuthor({ name: 'Naag', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                .addFields([
                    { name: 'Credits', value: `${credits}`, inline: true  },
                    { name: 'CPS', value: `${cps * multiplier}`, inline: true},
                    { name: 'Rebirths', value: `${rebirths}`, inline: true },
                    { name: 'Prestige', value: `${prestiges}`, inline: true },
                    { name: 'Multiplier', value: `${multiplier}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Dirt', value: `${dirt}`, inline: true },
                    { name: 'Stone', value: `${stone}`, inline: true },
                    { name: 'Copper', value: `${copper}`, inline: true },
                    { name: 'Iron', value: `${iron}`, inline: true },
                    { name: 'Redstone', value: `${redstone}`, inline: true },
                    { name: 'Lapis', value: `${lapis}`, inline: true },
                    { name: 'Gold', value: `${gold}`, inline: true },
                    { name: 'Diamond', value: `${diamond}`, inline: true },
                    { name: 'Emerald', value: `${emerald}`, inline: true },
                    { name: 'Netherite', value: `${netherite}`, inline: true },
                    { name: 'Estrogen', value: `${estrogen}`, inline: true },
                ])
                interaction.reply({embeds: [player_embed], ephemeral: true});
            }).catch((error) => {console.log(error)});
        }, 100);
	},
};
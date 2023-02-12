const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gens = new Map(); // Please keep order reversed as this is the order it buys it in
gens.set("dirt", {price: 70, value: 1, owned: 1})
gens.set("stone", {price: 5600, value: 8, owned: 0})
gens.set("copper", {price: 32800, value: 42, owned: 0})
gens.set("iron", {price: 216000, value: 260, owned: 0})
gens.set("redstone", {price: 1360000, value: 1550, owned: 0})
gens.set("lapis", {price: 8800000, value: 10000, owned: 0})
gens.set("gold", {price: 54400000, value: 60000 , owned: 0})
gens.set("diamond", {price: 352000000, value: 370000, owned: 0})
gens.set("emerald", {price: 2252000000, value: 2300000, owned: 0})
gens.set("netherite", {price: 14480000000, value: 14300000, owned: 0})
gens.set("estrogen", {price: 200000000000, value: 0.1, owned: 0});

var fields = [];

function addField(value, key, map) {
    fields.push({name: key, value: `Price: \`${value.price}\`\nValue: \`${value.value}\``, inline: true})
}

gens.forEach(addField);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('geninfo')
		.setDescription('displays gen info'),
	args: ["connection"],
	
	async execute(interaction, args) {
        const info_embed = new EmbedBuilder()
                
        .setColor("0x00FFFF")
        .setTitle(`Showing gen info`)
        .setAuthor({ name: 'Naag', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .addFields(fields)
        interaction.reply({embeds: [info_embed], ephemeral: true});
	},
};
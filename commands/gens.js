const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gens')
		.setDescription('Shows the gens'),
	args: [],
	
	async execute(interaction) {
		
		//Plurple Button
		const firstRow = new ActionRowBuilder() 
			.addComponents(
				new ButtonBuilder()
					.setCustomId('dirt')
					.setLabel('dirt') 
					.setEmoji("324967464532312064")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('stone')
					.setLabel('stone')
					.setEmoji("324967956566245377")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('copper')
					.setLabel('copper')
					.setEmoji("852294351496544296")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('iron')
					.setLabel('iron')
					.setEmoji("590724451566485546")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('redstone')
					.setLabel('redstone')
					.setEmoji("691841117012099164")
					.setStyle(ButtonStyle.Secondary),
			);
			const secondRow = new ActionRowBuilder() 
			.addComponents(
				new ButtonBuilder()
					.setCustomId('lapis')
					.setLabel('lapis')
					.setEmoji("631755512978997249")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('gold')
					.setLabel('gold')
					.setEmoji("590724618386538516")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('diamond')
					.setLabel('diamond')
					.setEmoji("591783543663886352")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('emerald')
					.setLabel('emerald')
					.setEmoji("590539774365007912")
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('netherite')
					.setLabel('netherite')
					.setEmoji("707622749773758474")
					.setStyle(ButtonStyle.Secondary),
			);
			const thirdRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('estrogen')
						.setLabel('estrogen')
						.setEmoji("1074110809829027852")
						.setStyle(ButtonStyle.Secondary),
				);
		await interaction.reply({ content: 'Showing Gens', components: [firstRow, secondRow, thirdRow], ephemeral: false});
	},
};
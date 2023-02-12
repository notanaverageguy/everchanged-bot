const { buyGen } = require("../../misc/libs");
const genInfo = require('../../misc/config.json').geninfo.emerald;
const gen = {price: genInfo.price, value: genInfo.value, name: "emerald"}

module.exports = {
	customId: gen.name,

	async execute(interaction, connection) {
        const interactionUser = await interaction.user
		const username = interactionUser.username;
		const userID = interactionUser.id;
        const user = {username: username, userID: userID}

		buyGen(interaction, connection, user, gen);
	},
}; 
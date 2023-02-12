const fs = require('fs')
var events = new Map();

const path = `${__dirname}/button events`;
const files = fs.readdirSync(path).filter(file => file.endsWith('.js'));

for (const file of files) {
	const event = require(`./button events/${file}`);
	events.set(event.customId, event);
}


module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction, connection) {
		if (!interaction.isButton()) return;

		const command = events.get(interaction.customId);
		
		if (!command) {
			interaction.reply({ content: `Thanks for submitting\nUnfortunately, we've had an error storing this correctly`, ephemeral: true })
			return;
		};
		try{
			command.execute(interaction, connection)
		} catch {
			interaction.reply({ content: `Unexpected Error`, ephemeral: true })
		}
	},
};
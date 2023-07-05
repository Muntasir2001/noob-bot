import { Client, Interaction } from 'discord.js';

import slashCommandHandler from '../slashCommands/index';
import buttonHandler from '../buttonHandler/index';
import selectMenuHandler from '../selectMenuHandler/index';
// import modalHandler from '../modalSubmitHandler';

export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			await slashCommandHandler(client, interaction);
		}

		if (interaction.isButton()) {
			await buttonHandler(client, interaction);
		}

		if (interaction.isSelectMenu()) {
			await selectMenuHandler(client, interaction);
		}

		// if (interaction.isModalSubmit()) {
		// 	await modalHandler(client, interaction);
		// }
	});
};

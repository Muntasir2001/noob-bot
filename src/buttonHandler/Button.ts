import { Client, ButtonInteraction } from 'discord.js';

export interface Button {
	customId: string;
	run: (client: Client, interaction: ButtonInteraction) => void;
}

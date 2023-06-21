import { MessageEmbed } from 'discord.js';
import botConfig from '../botConfig';

export enum types {
	INFO,
	ERROR,
	SUCCESS,
}

interface infoMessageEmbed {
	title: string;
	description?: string;
	fields?: { name: string; value: string; inline?: boolean }[];
	type?: types;
}

const infoMessageEmbed = (props: infoMessageEmbed) => {
	const { title, description, fields, type } = props;

	const embed = new MessageEmbed().setTitle(title).setTimestamp();

	if (description) {
		embed.setDescription(description);
	}

	if (fields && fields?.length > 0) {
		embed.addFields(fields);
	}

	switch (type) {
		case types.ERROR:
			embed.setColor(botConfig.color.red);
		case types.SUCCESS:
			embed.setColor(botConfig.color.green);
		default:
			embed.setColor(botConfig.color.default);
	}

	return embed;
};

export default infoMessageEmbed;

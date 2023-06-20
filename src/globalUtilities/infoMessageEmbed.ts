import { MessageEmbed } from 'discord.js';

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
			embed.setColor('#D83C3E');
		case types.SUCCESS:
			embed.setColor('#3BA55C');
		default:
			embed.setColor('#ff4454');
	}

	return embed;
};

export default infoMessageEmbed;

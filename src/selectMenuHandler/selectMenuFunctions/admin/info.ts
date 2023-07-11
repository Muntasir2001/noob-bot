import {
	MessageEmbed,
	SelectMenuInteraction,
	MessageActionRow,
	MessageButton,
	Client,
} from 'discord.js';
import botConfig from '../../../botConfig';

interface props {
	interaction: SelectMenuInteraction;
	client: Client;
}

const welcomeMessage = async (props: props) => {
	const { interaction, client } = props;

	const embed = new MessageEmbed()
		.setColor(botConfig.color.default)
		.setThumbnail(`${interaction.guild?.iconURL()}`)
		.setDescription(
			`## ${interaction.guild?.name}\n### - \`About server\`\nLearn more about the purpose of the server\n### - \`About noob_dev54\`\nLearn more about noob_dev54 (mz10ah).`,
		);

	const buttons = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId('aboutServer')
			.setLabel('About server')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('aboutMe')
			.setLabel('About noob_dev54')
			.setStyle('SECONDARY'),
	);

	return await interaction.channel!.send({
		embeds: [embed],
		components: [buttons],
	});
};

export default welcomeMessage;

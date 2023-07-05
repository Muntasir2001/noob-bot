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

	const guildId = process.env.GUILD_ID;

	const guild = guildId
		? client.guilds.cache.get(guildId)
		: client.guilds.cache.get(interaction.guild!.id);
	const { name } = guild!;
	const icon = guild!.iconURL();

	const embed = new MessageEmbed()
		.setColor(botConfig.color.default)
		.setThumbnail(icon!)
		.setDescription(
			`## ${name}\n### - \`Verify me\`\nTo verify yourself before you get to see all the channel of the server.\n### - \`Etourne\`\nTo gain access to Etourne software related channels to either request for support, share feedback or test bot commands.`,
		);

	const buttons = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId('verifyUser')
			.setLabel('Verify me')
			.setStyle('PRIMARY'),
		new MessageButton()
			.setCustomId('etourne')
			.setLabel('Etourne')
			.setStyle('SECONDARY'),
		new MessageButton()
			.setCustomId('aboutMe')
			.setLabel('About noob_dev54')
			.setStyle('SECONDARY'),
	);

	await interaction.channel!.send({
		embeds: [embed],
		components: [buttons],
	});
};

export default welcomeMessage;

import {
	Guild,
	GuildChannel,
	ThreadChannel,
	Collection,
	Snowflake,
} from 'discord.js';

interface props {
	guild: Guild;
	categoryName: string;
}

const isChannelCategoryExists = async (props: props) => {
	const { guild, categoryName } = props;

	let allChannels;

	await guild.channels
		.fetch()
		.then(
			(
				channels:
					| GuildChannel
					| ThreadChannel
					| Collection<Snowflake, GuildChannel | null>,
			) => (allChannels = channels),
		)
		.catch((err: any) => {
			throw err;
		});

	const isCategoryExist = allChannels!.find(
		(channel: any) =>
			channel &&
			channel.type === 'GUILD_CATEGORY' &&
			channel.name === categoryName,
	);

	return isCategoryExist ? true : false;
};

export default isChannelCategoryExists;

const Discord = require('discord.js');

const PREFIX = process.env.PREFIX;

const help = (message, CMD_NAME, args, client) => {
	try {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor('#FF4454')
			.setTitle(`${client.user.username}`)
			.setDescription('Here is the list of commands you can use')
			.setThumbnail(`${client.user.displayAvatarURL()}`)
			.addFields(
				{
					name: 'Kick',
					value: `\`${PREFIX}kick <uid>\` or \`@mention\` to kick the user out from the server`,
				},
				{
					name: 'Ban',
					value: `\`${PREFIX}ban <uid>\` or \`@mention\` to ban the user from the server`,
				},
				{
					name: 'Timeout',
					value: `\`${PREFIX}timeout <uid>/@mention time reason\` to timeout the user from the server`,
				},
				{
					name: 'Warn',
					value: `\`${PREFIX}warn <uid>\` or \`@mention\` and \`reason\` to warn the user`,
				},
				{
					name: 'Serverinfo',
					value: `\`${PREFIX}serverinfo\` to see info about the server (under development)`,
				},
				{
					name: 'Botinfo',
					value: `\`${PREFIX}botinfo\` to see info about the bot (under development)`,
				},
				{
					name: 'Userinfo',
					value: `\`${PREFIX}userinfo <uid>\` or \`@user\` to see info about the user. Just putting ${PREFIX} will show info about you (under development)`,
				},
				{
					name: 'Hello',
					value: `\`${PREFIX}hello @mention\` to say hello (@mention is optional)`,
				},
				{
					name: 'Bye',
					value: `\`${PREFIX}bye @mention\` to say bye (@mention is optional)`,
				},
				{
					name: 'gm',
					value: `\`${PREFIX}gm @mention\` to say good morning (@mention is optional)`,
				},
				{
					name: 'gn',
					value: `\`${PREFIX}gn @mention\` to say good night (@mention is optional)`,
				},
				{
					name: 'no u',
					value: `\`${PREFIX}nou <@user>\` or ${`nou`} to say no u`,
				},
				{
					name: 'Clear',
					value: `\`${PREFIX}clear <no of messages to clear>\` to delete the messages above. Just putting \`${PREFIX}clear\` will delete one message`,
				},
				{
					name: 'Avatar',
					value: `\`${PREFIX}avatar <uid>\` or \`@user\` to see avatar of an user. Just putting \`${PREFIX}avatar\` will display avatar of yours.`,
				},
				// { name: '\u200B', value: '\u200B' },
			)
			.setTimestamp();

		message.channel.send({ embeds: [helpEmbed] });
	} catch (err) {
		console.log({
			message: 'something went wrong in legacy help.js',
			actualErr: err,
		});
	}
};

module.exports = help;

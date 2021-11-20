const { GuildMember } = require('discord.js');

const kick = (interaction, CMD_NAME, options) => {
	// if (CMD_NAME === 'ping') {
	// const userID = options.getMentionable('userid', true);
	const userID = options.getUser('userid', true);
	const reason = options.getString('reason');

	if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
		return interaction.reply({
			content: 'HEY HEY HEY there, I see what you trynna do there :eyes:',
			ephemeral: false,
		});
	}

	const target = interaction.options.getMember(userID);

	// get user id (if using mentionable)
	// console.log(userID.user.id);
	console.log(target);
	console.log(userID);

	// interaction.member.kick(reason);
	// .then((member) => {
	// 	interaction.reply({
	// 		content: `${member} has been kicked. **Reason**: ${reason}`,
	// 		ephemeral: false,
	// 	});
	// })
	// .catch((err) => console.log(err));
	// target.kick(reason);

	interaction.reply({
		content: `User ${userID} has been kicked. **Reason**: ${reason}`,
		ephemeral: false,
	});
};

module.exports = kick;

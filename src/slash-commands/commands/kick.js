const kick = (interaction, CMD_NAME, options) => {
	const user = options.getUser('user', true);
	const reason = options.getString('reason');

	if (!interaction.memberPermissions.has('KICK_MEMBERS')) {
		return interaction.reply({
			content: 'HEY HEY HEY there, I see what you trynna do there :eyes:',
			ephemeral: false,
		});
	}

	const target = interaction.options.getMember('user');

	/* if user not found */
	if (!target) {
		console.log('Please tag an user to kick');

		return interaction.reply({
			content: `Please tag an user to kick`,
			ephemeral: false,
		});
	}

	/* if user kickable */
	if (!target.kickable) {
		return interaction.reply({
			content: `User not kickable :(`,
			ephemeral: false,
		});
	}

	// get user id (if using mentionable)
	// console.log(userID.user.id);
	// console.log(target);
	// console.log(user);

	target
		.kick(reason)
		.then(() => {
			interaction.reply({
				content: `User ${user} has been kicked. **Reason**: ${reason}`,
				ephemeral: false,
			});
		})
		.catch((err) => console.log(err));
};

module.exports = kick;

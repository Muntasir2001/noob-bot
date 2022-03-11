const ban = (interaction, CMD_NAME, options) => {
	const user = options.getUser('user', true);
	const days = options.getNumber('days');
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
		console.log('Please tag an user to ban');

		return interaction.reply({
			content: `Please tag an user to ban`,
			ephemeral: false,
		});
	}

	/* if user kickable */
	if (!target.bannable) {
		return interaction.reply({
			content: `User not bannable :(`,
			ephemeral: false,
		});
	}

	// get user id (if using mentionable)
	// console.log(userID.user.id);
	// console.log(target);
	// console.log(user);

	target
		.ban({ reason, days: days })
		.then(() => {
			interaction.reply({
				content: `User ${user} has been banned. **Reason**: ${reason}`,
				ephemeral: false,
			});
		})
		.catch((err) => console.log(err));
};

module.exports = ban;

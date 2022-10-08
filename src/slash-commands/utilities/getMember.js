const getMember = async (interaction, user, force) => {
	try {
		const member = await interaction.guild.members
			.fetch({ user: user, force: force })
			.catch((err) => {
				console.log(err);
				interaction.reply({ content: 'User not found' });
			});

		return member;
	} catch (err) {
		console.log({
			message: 'something went wrong in slashCommand util getMember.js',
			actualErr: err,
		});

		return;
	}
};

module.exports = getMember;

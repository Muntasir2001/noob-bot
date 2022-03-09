const getMember = async (interaction, user, force) => {
	try {
		const member = await interaction.guild.members
			.fetch(user, { force: force })
			.catch((err) => {
				console.log(err);
				interaction.reply({ content: 'User not found' });
			});

		return member;
	} catch (errr) {
		return;
	}
};

module.exports = getMember;

const fs = require('fs');

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
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in slashCommand/utils/getMember.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);

			return false;
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = getMember;

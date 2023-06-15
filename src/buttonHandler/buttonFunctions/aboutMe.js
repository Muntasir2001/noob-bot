const fs = require('fs');

const { MessageEmbed } = require('discord.js');
const infoMessageEmbed = require('../../globalUtils/infoMessageEmbed');

const aboutMe = async (interaction, client) => {
	try {
		const embed = new MessageEmbed()
			.setColor('#FF4454')
			.setTitle('About Me')
			.setDescription(
				'## Hello there :wave:\nI am `noob_dev54`/`mz10ah`/`Infinityboiz ッ`\n\n`💻  Full Stack Developer` - JavaScript/TypeScript,  Python\n`🎮  Gamer`\n`🚂 🎮  Moderator` - The Coding Train and Muslim Gamers League\n\n:globe_with_meridians:  **Website:** https://noobdev54.com\n\n### Technical Skills:\n1. JavaScript/Typescript - ReactJS/NextJS, Discord.js, Express.js\n2. Python - Flask\n3. Figma/Adobe XD',
			)
			.setTimestamp();

		return await interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	} catch (err) {
		try {
			fs.appendFile(
				'logs/crash_logs.txt',
				`${new Date().toUTCString()} : Something went wrong in buttonHandler/buttonFunctions/aboutMe.js \n Actual error: ${err} \n \n`,
				(err) => {
					if (err) throw err;
				},
			);
		} catch (err) {
			console.log('Error logging failed');
		}
	}
};

module.exports = aboutMe;

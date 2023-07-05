"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const aboutMe = {
    customId: 'aboutMe',
    run: async (client, interaction) => {
        try {
            const embed = new discord_js_1.MessageEmbed()
                .setColor('#FF4454')
                .setTitle('About Me')
                .setDescription('## Hello there :wave:\nI am `noob_dev54`/`mz10ah`/`Infinityboiz ッ`\n\n`💻  Full Stack Developer` - JavaScript/TypeScript,  Python\n`🎮  Gamer`\n`🚂 🎮  Moderator` - The Coding Train and Muslim Gamers League\n\n:globe_with_meridians:  **Website:** https://noobdev54.com\n\n### Technical Skills:\n1. JavaScript/Typescript - ReactJS/NextJS, Discord.js, Express.js\n2. Python - Flask\n3. Figma/Adobe XD\n\n### For Enquiries:\n1. DM <@374230181889572876>\nor\n2. Hit the `Enquire` button.')
                .setTimestamp();
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
        catch (err) {
            await interaction.reply({
                embeds: [
                    (0, infoMessageEmbed_1.default)({
                        title: ':x: Something went wrong',
                        type: infoMessageEmbed_1.types.ERROR,
                    }),
                ],
                ephemeral: true,
            });
            (0, logFile_1.default)({
                error: err,
                folder: 'buttonHandler',
                file: 'aboutMe',
            });
        }
    },
};
exports.default = aboutMe;

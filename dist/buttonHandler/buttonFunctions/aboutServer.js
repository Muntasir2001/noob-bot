"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const aboutServer = {
    customId: 'aboutServer',
    run: async (client, interaction) => {
        try {
            const embed = new discord_js_1.MessageEmbed()
                .setColor('#FF4454')
                .setTitle('About the server')
                .setDescription('Initially, this server was created to test all the Discord bots that I have created as well as other Discord bots. The idea has then evolved to allow other programmers to join and request for assistance from me (or other programmers). Soon enough, non-programmers started to join to test out the bots I create (and other cool stuff).\n\nThe server is now open to everyone to join (subject to **verification**) and it also has a separate category for anyone to request support for Etourne (event and tournament management software). ')
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
                file: 'aboutServer',
            });
        }
    },
};
exports.default = aboutServer;

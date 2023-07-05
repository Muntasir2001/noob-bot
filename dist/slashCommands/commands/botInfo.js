"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const formatProcessUptime_1 = tslib_1.__importDefault(require("../utilities/formatProcessUptime"));
const botConfig_1 = tslib_1.__importDefault(require("../../botConfig"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const botInfo = {
    name: 'botinfo',
    description: 'Information about the bot',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const botInfoEmbed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({
                name: `${client.user.username}`,
                iconURL: `${client.user.displayAvatarURL()}`,
            })
                .addFields({ name: 'Bot Tag', value: `${client.user.tag}` }, { name: 'Bot version', value: `1.0-beta` })
                .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
                .setTimestamp();
            if (interaction.user.id === process.env.OWNER_ID) {
                botInfoEmbed.addFields([
                    {
                        name: 'Time elapsed since last restart',
                        value: `${(0, formatProcessUptime_1.default)({
                            uptime: process.uptime(),
                        })}`,
                    },
                ]);
            }
            await interaction.reply({
                embeds: [botInfoEmbed],
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
                folder: 'slashCommands',
                file: 'botInfo',
            });
        }
    },
};
exports.default = botInfo;

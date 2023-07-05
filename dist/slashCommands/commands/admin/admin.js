"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const isUserAdmin_1 = tslib_1.__importDefault(require("../../../globalUtilities/isUserAdmin"));
const admin = {
    name: 'admin',
    description: 'Admin commands',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            if (!(0, isUserAdmin_1.default)({ userId: interaction.user.id })) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':warning: You are not allowed to run this command!',
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                });
            }
            const options = [
                {
                    label: 'Welcome Message',
                    description: 'Share the welcome message',
                    value: 'welcome message',
                },
            ];
            const selectMenu = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId('admin')
                .setPlaceholder('Select option to execute')
                .addOptions(options));
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Select option to execute')
                .setColor(botConfig_1.default.color.default)
                .setTimestamp();
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true,
                components: [selectMenu],
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
                folder: 'slashCommands/admin',
                file: 'admin',
            });
        }
    },
};
exports.default = admin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../botConfig"));
const avatar = {
    name: 'avatar',
    description: 'Display avatar of an user',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: true,
            type: 'USER',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const avatar = user.displayAvatarURL({ size: 4096 });
            const avatarEmbed = new discord_js_1.MessageEmbed()
                .setColor(user.hexAccentColor || botConfig_1.default.color.default)
                .setTitle(`Avatar for ${user.tag}`)
                .setDescription(`[jpg](${user.displayAvatarURL({
                format: 'jpg',
                size: 4096,
            })}) | [png](${user.displayAvatarURL({
                format: 'png',
                size: 4096,
            })}) | [webp](${user.displayAvatarURL({
                format: 'webp',
                size: 4096,
            })}) | [jpeg](${user.displayAvatarURL({
                format: 'jpeg',
                size: 4096,
            })})`)
                .setImage(avatar)
                .setTimestamp();
            return await interaction.reply({
                embeds: [avatarEmbed],
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
                file: 'avatar',
            });
        }
    },
};
exports.default = avatar;

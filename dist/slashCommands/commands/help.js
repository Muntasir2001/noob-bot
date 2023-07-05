"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../botConfig"));
const commandIds_1 = tslib_1.__importDefault(require("../../commandIds/commandIds"));
const help = {
    name: 'help',
    description: 'View list of all the commands',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const embed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setThumbnail(`${client.user?.displayAvatarURL()}`)
                .setTitle('❓ Help')
                .setDescription('Here is the list of commands you can use')
                .addFields([
                {
                    name: ':boot: Kick',
                    value: `</kick:${commandIds_1.default.KICK}>`,
                },
                {
                    name: ':hammer: Ban',
                    value: `</ban:${commandIds_1.default.BAN}>`,
                },
                {
                    name: ':clock: Timeout',
                    value: `</timeout:${commandIds_1.default.TIMEOUT}>`,
                },
                {
                    name: ':stop_sign: Warn',
                    value: `</warn:${commandIds_1.default.WARN}>`,
                },
                {
                    name: ':broom: Purge',
                    value: `</purge:${commandIds_1.default.PURGE}>`,
                },
                {
                    name: ':frame_photo: Avatar',
                    value: `</avatar:${commandIds_1.default.AVATAR}>`,
                },
                {
                    name: ':robot: Bot Info',
                    value: `</botinfo:${commandIds_1.default.BOT_INFO}>`,
                },
                {
                    name: ':information_source: Server Info',
                    value: `</serverinfo:${commandIds_1.default.SERVER_INFO}>`,
                },
                {
                    name: ':bust_in_silhouette: User Info',
                    value: `</userinfo:${commandIds_1.default.USER_INFO}>`,
                },
            ])
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag}` });
            return await interaction.reply({
                embeds: [embed],
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
                file: 'help',
            });
        }
    },
};
exports.default = help;

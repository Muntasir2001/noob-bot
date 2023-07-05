"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const roleIds_1 = tslib_1.__importDefault(require("../../roleIds/roleIds"));
const etourne = {
    customId: 'etourne',
    run: async (client, interaction) => {
        try {
            const userRoles = interaction.member.roles
                .cache;
            const role = interaction.guild.roles.cache.find((r) => r.id === roleIds_1.default.ETOURNE);
            const { member } = interaction;
            if (!userRoles.some((role) => role.id === roleIds_1.default.ETOURNE)) {
                if (member instanceof discord_js_1.GuildMember)
                    member.roles.add(roleIds_1.default.ETOURNE);
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':white_check_mark: Etourne role added!',
                            type: infoMessageEmbed_1.types.SUCCESS,
                        }),
                    ],
                });
            }
            else {
                if (member instanceof discord_js_1.GuildMember)
                    member.roles.remove(roleIds_1.default.ETOURNE);
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':white_check_mark: Etourne role removed!',
                            type: infoMessageEmbed_1.types.SUCCESS,
                        }),
                    ],
                });
            }
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
                file: 'etourne',
            });
        }
    },
};
exports.default = etourne;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const roleIds_1 = tslib_1.__importDefault(require("../../roleIds/roleIds"));
const closeChannel = {
    customId: 'closeChannel',
    run: async (client, interaction) => {
        try {
            const roles = interaction.member.roles
                .cache;
            if (!interaction.memberPermissions?.has('MANAGE_CHANNELS') &&
                !roles.some((role) => role.id === roleIds_1.default.MOD_ROLE)) {
                return interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':warning: You are not allowed to use this button!',
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                    ephemeral: true,
                });
            }
            await interaction.channel?.delete();
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
                file: 'closeTicket',
            });
        }
    },
};
exports.default = closeChannel;

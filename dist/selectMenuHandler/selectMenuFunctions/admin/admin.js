"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const welcomeMessage_1 = tslib_1.__importDefault(require("./welcomeMessage"));
const admin = {
    customId: 'admin',
    run: async (client, interaction) => {
        try {
            const option = interaction.values[0];
            if (option === 'welcome message') {
                await (0, welcomeMessage_1.default)({ interaction: interaction, client: client });
            }
            return await interaction.update({
                embeds: [
                    (0, infoMessageEmbed_1.default)({
                        title: `Command executed successfully!`,
                        type: infoMessageEmbed_1.types.SUCCESS,
                    }),
                ],
                components: [],
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
                folder: 'selectMenuHandler/admin',
                file: 'admin',
            });
        }
    },
};
exports.default = admin;

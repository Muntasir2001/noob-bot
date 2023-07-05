"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../slashCommands/index"));
const index_2 = tslib_1.__importDefault(require("../buttonHandler/index"));
const index_3 = tslib_1.__importDefault(require("../selectMenuHandler/index"));
exports.default = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await (0, index_1.default)(client, interaction);
        }
        if (interaction.isButton()) {
            await (0, index_2.default)(client, interaction);
        }
        if (interaction.isSelectMenu()) {
            await (0, index_3.default)(client, interaction);
        }
    });
};

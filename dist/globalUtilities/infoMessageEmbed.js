"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const botConfig_1 = tslib_1.__importDefault(require("../botConfig"));
var types;
(function (types) {
    types[types["INFO"] = 0] = "INFO";
    types[types["ERROR"] = 1] = "ERROR";
    types[types["SUCCESS"] = 2] = "SUCCESS";
})(types || (exports.types = types = {}));
const infoMessageEmbed = (props) => {
    const { title, description, fields, type } = props;
    const embed = new discord_js_1.MessageEmbed().setTitle(title).setTimestamp();
    if (description) {
        embed.setDescription(description);
    }
    if (fields && fields?.length > 0) {
        embed.addFields(fields);
    }
    switch (type) {
        case types.ERROR:
            embed.setColor(botConfig_1.default.color.red);
            break;
        case types.SUCCESS:
            embed.setColor(botConfig_1.default.color.green);
            break;
        default:
            embed.setColor(botConfig_1.default.color.default);
            break;
    }
    return embed;
};
exports.default = infoMessageEmbed;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const welcomeMessage = async (props) => {
    const { interaction, client } = props;
    const embed = new discord_js_1.MessageEmbed()
        .setColor(botConfig_1.default.color.default)
        .setThumbnail(`${interaction.guild?.iconURL()}`)
        .setDescription(`## ${interaction.guild?.name}\n### - \`About server\`\nLearn more about the purpose of the server\n### - \`About noob_dev54\`\nLearn more about noob_dev54 (mz10ah).`);
    const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
        .setCustomId('aboutServer')
        .setLabel('About server')
        .setStyle('PRIMARY'), new discord_js_1.MessageButton()
        .setCustomId('aboutMe')
        .setLabel('About noob_dev54')
        .setStyle('SECONDARY'));
    return await interaction.channel.send({
        embeds: [embed],
        components: [buttons],
    });
};
exports.default = welcomeMessage;

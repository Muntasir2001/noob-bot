"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const welcomeMessage = async (props) => {
    const { interaction, client } = props;
    const guildId = process.env.GUILD_ID;
    const guild = guildId
        ? client.guilds.cache.get(guildId)
        : client.guilds.cache.get(interaction.guild.id);
    const { name } = guild;
    const icon = guild.iconURL();
    const embed = new discord_js_1.MessageEmbed()
        .setColor(botConfig_1.default.color.default)
        .setThumbnail(icon)
        .setDescription(`## ${name}\n### - \`Verify me\`\nTo verify yourself before you get to see all the channel of the server.\n### - \`Etourne\`\nTo gain access to Etourne software related channels to either request for support, share feedback or test bot commands.`);
    const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
        .setCustomId('verifyUser')
        .setLabel('Verify me')
        .setStyle('PRIMARY'), new discord_js_1.MessageButton()
        .setCustomId('etourne')
        .setLabel('Etourne')
        .setStyle('SECONDARY'), new discord_js_1.MessageButton()
        .setCustomId('aboutMe')
        .setLabel('About noob_dev54')
        .setStyle('SECONDARY'));
    await interaction.channel.send({
        embeds: [embed],
        components: [buttons],
    });
};
exports.default = welcomeMessage;

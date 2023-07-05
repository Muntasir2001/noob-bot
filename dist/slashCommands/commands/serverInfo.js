"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../botConfig"));
const serverInfo = {
    name: 'serverinfo',
    description: 'Get server information',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const { guild } = interaction;
            const { name, memberCount, roles, ownerId, createdTimestamp } = guild;
            const infoEmbed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setTitle(name)
                .setDescription(`Info about ${name}`)
                .setThumbnail(guild.iconURL())
                .addFields({
                name: 'Server Owner',
                value: `<@${ownerId}>`,
                inline: true,
            }, {
                name: 'Role count',
                value: roles.cache.size.toString(),
                inline: true,
            }, {
                name: 'Number of Members',
                value: memberCount.toString(),
                inline: true,
            }, {
                name: 'Server created',
                value: new Date(createdTimestamp).toLocaleString() + ' GMT',
                inline: false,
            })
                .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
                .setTimestamp();
            return await interaction.reply({
                embeds: [infoEmbed],
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
                file: 'serverInfo',
            });
        }
    },
};
exports.default = serverInfo;

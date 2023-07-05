"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../botConfig"));
const userInfo = {
    name: 'userinfo',
    description: 'Get information of an user',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: false,
            type: 'USER',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const member = user
                ? interaction.guild.members.cache.get(user.id)
                : interaction.guild.members.cache.get(interaction.user.id);
            let roles = member.roles.cache
                .map((r) => r)
                .join(' ')
                .replace('@everyone', ' ');
            roles = roles.length > 1 ? roles : 'No Roles';
            const userInfoEmbed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setTitle(`Information about ${member.user.username}`)
                .setAuthor({
                name: `${member.user.username}` || 'None',
                iconURL: `${member.user.displayAvatarURL()}` || 'None',
            })
                .setThumbnail(`${member.user.displayAvatarURL()}` || 'None')
                .addFields({
                name: 'User tag',
                value: member.user.tag || 'None',
                inline: true,
            }, { name: '\u200B', value: '\u200B', inline: true }, {
                name: 'Nickname',
                value: member.nickname || 'None',
                inline: true,
            }, {
                name: 'Account created',
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>` || 'None',
                inline: true,
            }, { name: '\u200B', value: '\u200B', inline: true }, {
                name: 'Joined the server',
                value: `<t:${Math.floor(member.guild.joinedTimestamp / 1000)}:F>` || 'None',
                inline: true,
            }, {
                name: 'Roles',
                value: `${roles}` || 'None',
            }, {
                name: 'User ID',
                value: `\`${member.user.id}\``,
            })
                .setTimestamp()
                .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });
            return await interaction.reply({
                embeds: [userInfoEmbed],
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
                file: 'userInfo',
            });
        }
    },
};
exports.default = userInfo;

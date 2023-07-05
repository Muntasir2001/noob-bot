"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const roleIds_1 = tslib_1.__importDefault(require("../../../roleIds/roleIds"));
const warn = {
    name: 'warn',
    description: 'Warn a user',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: true,
            type: 'USER',
        },
        {
            name: 'reason',
            description: 'reason for the warning',
            required: true,
            type: 'STRING',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.get('reason');
            const roles = interaction.member.roles
                .cache;
            if (!interaction.memberPermissions.has('KICK_MEMBERS') &&
                !roles.some((role) => role.id === roleIds_1.default.MOD_ROLE)) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':warning: You are not allowed to use this command!',
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                });
            }
            const guildId = process.env.GUILD_ID;
            const guild = guildId
                ? client.guilds.cache.get(guildId)
                : client.guilds.cache.get(interaction.guild.id);
            let warningChannelId;
            let warningChannel;
            const warnGuild = guild.channels.create(`Warning-${user.tag}`, {
                type: 'GUILD_TEXT',
                topic: `Warning to ${user}`,
                reason: `${interaction.member.user} has warned ${user}`,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: roleIds_1.default.MOD_ROLE,
                        allow: [
                            'VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'ATTACH_FILES',
                            'EMBED_LINKS',
                            'READ_MESSAGE_HISTORY',
                        ],
                    },
                    {
                        id: user.id,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['SEND_MESSAGES'],
                    },
                ],
            });
            await warnGuild
                .then((data) => {
                warningChannel = data;
                warningChannelId = data.id;
            })
                .catch((err) => {
                throw err;
            });
            const embed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setTitle(`:warning: Warned ${user.tag}`)
                .addFields([
                {
                    name: 'Moderator',
                    value: `${interaction.member.user}`,
                },
                {
                    name: 'Reason',
                    value: `${reason.value}`,
                },
                {
                    name: 'Warning Channel',
                    value: `<#${warningChannelId}>`,
                },
            ])
                .setTimestamp()
                .setFooter({ text: `Member ID: ${user.id}` });
            const warningMessageEmbed = new discord_js_1.MessageEmbed()
                .setColor('#FF4454')
                .setTitle(`:warning: You have received a warning`)
                .addFields([
                {
                    name: 'Reason',
                    value: `${reason.value}`,
                },
            ])
                .setTimestamp()
                .setFooter({
                text: `Reach out to mods if you have any question`,
            });
            const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('closeChannel')
                .setLabel('Close channel')
                .setStyle('DANGER'));
            await warningChannel.send({
                content: `<@${user.id}>`,
                embeds: [warningMessageEmbed],
                components: [buttons],
            });
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
                folder: 'slashCommands/moderation',
                file: 'warn',
            });
        }
    },
};
exports.default = warn;

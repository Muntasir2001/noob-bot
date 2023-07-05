"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../globalUtilities/infoMessageEmbed"));
const logFile_1 = tslib_1.__importDefault(require("../../globalUtilities/logFile"));
const isChannelCategoryExists_1 = tslib_1.__importDefault(require("../../globalUtilities/isChannelCategoryExists"));
const getChannelCategoryId_1 = tslib_1.__importDefault(require("../../globalUtilities/getChannelCategoryId"));
const roleIds_1 = tslib_1.__importDefault(require("../../roleIds/roleIds"));
const verifyUser = {
    customId: 'verifyUser',
    run: async (client, interaction) => {
        try {
            const guildId = process.env.GUILD_ID;
            const guild = guildId
                ? client.guilds.cache.get(guildId)
                : client.guilds.cache.get(interaction.guild.id);
            let verifyChannel;
            if (await (0, isChannelCategoryExists_1.default)({
                guild: guild,
                categoryName: 'Verify',
            })) {
                const categoryId = await (0, getChannelCategoryId_1.default)({
                    guild: guild,
                    categoryName: 'Verify',
                });
                const resolvedCategory = guild.channels.resolve(categoryId);
                const verifyChannelCreate = resolvedCategory.createChannel(`verify-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `Verify ${interaction.user.id}`,
                    reason: `Verify ${interaction.user.id}`,
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: await guild.roles.fetch(roleIds_1.default.MOD_ROLE),
                            allow: [
                                'VIEW_CHANNEL',
                                'SEND_MESSAGES',
                                'ATTACH_FILES',
                                'EMBED_LINKS',
                                'READ_MESSAGE_HISTORY',
                            ],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                    ],
                });
                await verifyChannelCreate
                    .then((data) => {
                    verifyChannel = data;
                })
                    .catch((err) => {
                    throw err;
                });
            }
            else {
                const verifyChannelCreate = guild.channels.create(`verify-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `Verify ${interaction.user.id}`,
                    reason: `Verify ${interaction.user.id}`,
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
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                    ],
                });
                let verifyChannel;
                await verifyChannelCreate
                    .then((data) => {
                    verifyChannel = data;
                })
                    .catch((err) => {
                    throw err;
                });
            }
            const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId('closeChannel')
                .setLabel('Close ticket')
                .setStyle('DANGER'));
            verifyChannel.send({
                content: `<@${interaction.user.id}>`,
                embeds: [
                    (0, infoMessageEmbed_1.default)({
                        title: 'Please wait until one of the moderators verifies you.',
                    }),
                ],
                components: [buttons],
            });
            return await interaction.reply({
                embeds: [
                    (0, infoMessageEmbed_1.default)({
                        title: `${verifyChannel} was created, please go there to get verified.`,
                    }),
                ],
                ephemeral: true,
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
                folder: 'buttonHandler',
                file: 'verifyUser',
            });
        }
    },
};
exports.default = verifyUser;

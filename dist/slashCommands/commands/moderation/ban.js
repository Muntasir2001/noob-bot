"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const ban = {
    name: 'ban',
    description: 'Ban member from the server',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: true,
            type: 'USER',
        },
        {
            name: 'reason',
            description: 'reason for ban',
            required: true,
            type: 'STRING',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.get('reason');
            if (!interaction.memberPermissions?.has('BAN_MEMBERS')) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':warning: You are not allowed to run this command!',
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                    ephemeral: false,
                });
            }
            const target = await interaction
                .guild.members.fetch({ user: user })
                .catch((err) => {
                throw err;
            });
            if (!target.bannable) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: `:x: ${user.tag} cannot be banned!`,
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                    ephemeral: true,
                });
            }
            await target
                .ban({ reason: reason.value })
                .then(async () => {
                const banEmbed = new discord_js_1.MessageEmbed()
                    .setColor(botConfig_1.default.color.default)
                    .setThumbnail(user.displayAvatarURL())
                    .setTitle(`:no_entry: Banned ${target.user.tag}`)
                    .addFields({
                    name: 'Moderator',
                    value: `${interaction.member.user}`,
                }, {
                    name: 'Banned user',
                    value: `${user} `,
                }, {
                    name: 'Reason',
                    value: reason.value,
                })
                    .setTimestamp()
                    .setFooter({ text: `Member ID: ${target.user.id}` });
                const logChannel = interaction.guild?.channels.resolve(process.env.LOG_CHANNEL_ID);
                if (logChannel)
                    await logChannel.send({ embeds: [banEmbed] });
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: `:hammer: ${user.tag} has been banned successfully`,
                            type: infoMessageEmbed_1.types.SUCCESS,
                        }),
                    ],
                    ephemeral: true,
                });
            })
                .catch((err) => {
                throw err;
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
                file: 'ban',
            });
        }
    },
};
exports.default = ban;

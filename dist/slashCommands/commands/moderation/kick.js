"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const kick = {
    name: 'kick',
    description: 'Kick member from the server',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: true,
            type: 'USER',
        },
        {
            name: 'reason',
            description: 'reason for kick',
            required: true,
            type: 'STRING',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.get('reason');
            if (!interaction.memberPermissions?.has('KICK_MEMBERS')) {
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
            if (!target.kickable) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: `:x: ${user.tag} cannot be kicked!`,
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                    ephemeral: true,
                });
            }
            await target
                .kick(reason)
                .then(async () => {
                const kickEmbed = new discord_js_1.MessageEmbed()
                    .setColor(botConfig_1.default.color.default)
                    .setTitle(`:boot: Kicked ${target.user.tag}`)
                    .setThumbnail(user.displayAvatarURL())
                    .addFields({
                    name: 'Moderator',
                    value: `${interaction.member?.user}`,
                }, {
                    name: 'Kicked user',
                    value: `${user} (${user.tag})`,
                }, {
                    name: 'Reason',
                    value: reason.value,
                })
                    .setTimestamp()
                    .setFooter({ text: `Member ID: ${target.user.id}` });
                const logChannel = interaction.guild?.channels.resolve(process.env.LOG_CHANNEL_ID);
                if (logChannel)
                    await logChannel.send({ embeds: [kickEmbed] });
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: `:boot: ${user.tag} has been kicked`,
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
                file: 'kick',
            });
        }
    },
};
exports.default = kick;

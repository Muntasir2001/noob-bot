"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const timeout = {
    name: 'timeout',
    description: 'Timeout a member in the server',
    options: [
        {
            name: 'user',
            description: 'select user',
            required: true,
            type: 'USER',
        },
        {
            name: 'time',
            description: 'length of timeout in minutes',
            required: true,
            type: 'NUMBER',
        },
        {
            name: 'reason',
            description: 'reason for timeout',
            required: true,
            type: 'STRING',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.get('reason');
            const time = interaction.options.get('time');
            if (!interaction.memberPermissions?.has('MODERATE_MEMBERS')) {
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
            if (!target.moderatable) {
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: ':x: User cannot be timeout out!',
                            type: infoMessageEmbed_1.types.ERROR,
                        }),
                    ],
                    ephemeral: false,
                });
            }
            const embed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setThumbnail(user.displayAvatarURL())
                .setTitle(`:alarm_clock: Timed out ${user.tag}`)
                .addFields({
                name: 'Moderator',
                value: `${interaction.member?.user}`,
            }, {
                name: 'Timed out user',
                value: `<@${user.id}> (${user.tag})`,
            }, {
                name: 'Timeout length',
                value: time.value === 1
                    ? `${time.value} minute`
                    : `${time.value} minutes`,
            }, {
                name: 'Reason',
                value: reason.value,
            })
                .setTimestamp()
                .setFooter({ text: `Member ID: ${target.id}` });
            await target
                .timeout(time.value * 1000 * 60, reason)
                .then(async () => {
                const logChannel = interaction.guild?.channels.resolve(process.env.LOG_CHANNEL_ID);
                if (logChannel)
                    await logChannel.send({ embeds: [embed] });
                return await interaction.reply({
                    embeds: [
                        (0, infoMessageEmbed_1.default)({
                            title: `:clock: ${user.tag} has been timed out for ${time.value} minutes`,
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
                file: 'timeout',
            });
        }
    },
};
exports.default = timeout;

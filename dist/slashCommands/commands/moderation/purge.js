"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const logFile_1 = tslib_1.__importDefault(require("../../../globalUtilities/logFile"));
const infoMessageEmbed_1 = tslib_1.__importStar(require("../../../globalUtilities/infoMessageEmbed"));
const botConfig_1 = tslib_1.__importDefault(require("../../../botConfig"));
const purge = {
    name: 'purge',
    description: 'Purge messages',
    options: [
        {
            name: 'number',
            description: 'number of messages to purge',
            required: true,
            type: 'NUMBER',
        },
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        try {
            const number = interaction.options.get('number');
            let allDeletedMessages;
            let deletedMessages = '>>> ';
            if (!interaction.memberPermissions?.has('MANAGE_MESSAGES')) {
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
            if (interaction.channel?.isText() &&
                !(interaction.channel.type === 'DM')) {
                await interaction.channel
                    ?.bulkDelete(number?.value, true)
                    .then((m) => {
                    allDeletedMessages = m;
                });
            }
            allDeletedMessages.forEach((message) => {
                deletedMessages += `${message.author.tag}: ${message.content} \n`;
            });
            const logChannel = interaction.guild?.channels.resolve(process.env.LOG_CHANNEL_ID);
            if (!logChannel)
                return;
            const logEmbed = new discord_js_1.MessageEmbed()
                .setColor(botConfig_1.default.color.default)
                .setTitle(`Purged ${allDeletedMessages.size} messages`)
                .addFields({
                name: 'Moderator',
                value: `${interaction.member.user}`,
            }, {
                name: 'Channel',
                value: `<#${interaction.channel?.id}>`,
            }, {
                name: 'Messages purged',
                value: deletedMessages,
            })
                .setFooter({ text: interaction.guild.name })
                .setTimestamp();
            await logChannel.send({ embeds: [logEmbed] });
            return await interaction.reply({
                embeds: [
                    (0, infoMessageEmbed_1.default)({
                        title: `:white_check_mark: Deleted ${allDeletedMessages.size} messages`,
                        type: infoMessageEmbed_1.types.SUCCESS,
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
                folder: 'slashCommands/moderation',
                file: 'purge',
            });
        }
    },
};
exports.default = purge;

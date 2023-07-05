"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
require('dotenv').config();
const discord_js_1 = require("discord.js");
const slashCommandsList_1 = tslib_1.__importDefault(require("./slashCommands/slashCommandsList"));
const interactionCreate_1 = tslib_1.__importDefault(require("./listeners/interactionCreate"));
const client = new discord_js_1.Client({
    partials: ['MESSAGE', 'REACTION'],
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_BANS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
});
client.on('ready', async () => {
    try {
        fs_1.default.appendFile('logs/restart.txt', `${new Date()} : Bot restarted \n`, (err) => {
            if (err)
                throw err;
        });
    }
    catch (err) {
        console.log('Logging failed');
    }
    const guildId = process.env.GUILD_ID;
    const guild = client.guilds.cache.get(guildId);
    let commands;
    if (guild && guildId != undefined) {
        commands = guild.commands;
    }
    else {
        commands = client.application.commands;
    }
    await commands.set(slashCommandsList_1.default);
    console.log(`${client.user?.tag} has logged in BEEP BEEP 🤖`);
    client.user?.setPresence({
        activities: [{ name: `/help` }],
    });
    setInterval(() => {
        client.user?.setPresence({
            activities: [{ name: `/help` }],
        });
    }, 1000 * 60 * 360);
});
(0, interactionCreate_1.default)(client);
client.login(process.env.DISCORDJS_BOT_TOKEN);
exports.default = client;

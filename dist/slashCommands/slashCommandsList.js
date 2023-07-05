"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const botInfo_1 = tslib_1.__importDefault(require("./commands/botInfo"));
const ban_1 = tslib_1.__importDefault(require("./commands/moderation/ban"));
const kick_1 = tslib_1.__importDefault(require("./commands/moderation/kick"));
const purge_1 = tslib_1.__importDefault(require("./commands/moderation/purge"));
const timeout_1 = tslib_1.__importDefault(require("./commands/moderation/timeout"));
const avatar_1 = tslib_1.__importDefault(require("./commands/avatar"));
const serverInfo_1 = tslib_1.__importDefault(require("./commands/serverInfo"));
const userInfo_1 = tslib_1.__importDefault(require("./commands/userInfo"));
const warn_1 = tslib_1.__importDefault(require("./commands/moderation/warn"));
const help_1 = tslib_1.__importDefault(require("./commands/help"));
const admin_1 = tslib_1.__importDefault(require("./commands/admin/admin"));
const slashCommandsList = [
    botInfo_1.default,
    ban_1.default,
    kick_1.default,
    purge_1.default,
    timeout_1.default,
    avatar_1.default,
    serverInfo_1.default,
    userInfo_1.default,
    warn_1.default,
    help_1.default,
    admin_1.default,
];
exports.default = slashCommandsList;

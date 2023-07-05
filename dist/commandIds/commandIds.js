"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandIds = {
    HELP: process.env.MODE === 'DEV' ? '1121851980164386826' : '912108220917612596',
    KICK: process.env.MODE === 'DEV'
        ? '1121047119072067605'
        : '1121047119072067605',
    WARN: process.env.MODE === 'DEV'
        ? '1125838943779307631'
        : '1125838943779307631',
    BAN: process.env.MODE === 'DEV'
        ? '1121047118577147907'
        : '1121047118577147907',
    TIMEOUT: process.env.MODE === 'DEV'
        ? '1121047119072067608'
        : '1121047119072067608',
    PURGE: process.env.MODE === 'DEV'
        ? '1121047119072067607'
        : '1121047119072067607',
    SERVER_INFO: process.env.MODE === 'DEV'
        ? '1121478569583988816'
        : '1121478569583988816',
    BOT_INFO: process.env.MODE === 'DEV'
        ? '1121047118577147906'
        : '1121047118577147906',
    USER_INFO: process.env.MODE === 'DEV'
        ? '1121486667165999204'
        : '1121486667165999204',
    AVATAR: process.env.MODE === 'DEV'
        ? '1121474025030422608'
        : '1121474025030422608',
};
exports.default = commandIds;

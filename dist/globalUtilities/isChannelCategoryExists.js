"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isChannelCategoryExists = async (props) => {
    const { guild, categoryName } = props;
    let allChannels;
    await guild.channels
        .fetch()
        .then((channels) => (allChannels = channels))
        .catch((err) => {
        throw err;
    });
    const isCategoryExist = allChannels.find((channel) => channel &&
        channel.type === 'GUILD_CATEGORY' &&
        channel.name === categoryName);
    return isCategoryExist ? true : false;
};
exports.default = isChannelCategoryExists;

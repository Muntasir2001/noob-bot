"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChannelCategoryId = async (props) => {
    const { guild, categoryName } = props;
    let allChannels;
    await guild.channels
        .fetch()
        .then((channels) => (allChannels = channels))
        .catch((err) => {
        throw err;
    });
    const category = allChannels.find((channel) => channel &&
        channel.type === 'GUILD_CATEGORY' &&
        channel.name === categoryName);
    return category.id;
};
exports.default = getChannelCategoryId;

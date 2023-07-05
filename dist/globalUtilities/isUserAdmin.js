"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS;
const isUserAdmin = (props) => {
    const { userId } = props;
    const adminUserIDsArray = ADMIN_USER_IDS.split(' ');
    if (adminUserIDsArray.indexOf(userId) !== -1) {
        return true;
    }
    else {
        return false;
    }
};
exports.default = isUserAdmin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const logFile = (props) => {
    const { error, file, folder } = props;
    try {
        fs_1.default.appendFile('logs/crash_logs.txt', `${new Date().toUTCString()} : Something went wrong in ${folder}/${file}.ts \n Actual error: ${error} \n \n`, (err) => {
            if (err)
                throw err;
        });
        return false;
    }
    catch (err) {
        console.log('Error logging failed');
    }
};
exports.default = logFile;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const closeChannel_1 = tslib_1.__importDefault(require("./buttonFunctions/closeChannel"));
const verifyUser_1 = tslib_1.__importDefault(require("./buttonFunctions/verifyUser"));
const buttonList = [verifyUser_1.default, closeChannel_1.default];
exports.default = buttonList;

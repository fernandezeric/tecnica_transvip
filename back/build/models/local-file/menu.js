"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const getAll = async () => {
    const menus = [];
    for (const res of data_json_1.default) {
        menus.push({
            name: res.name
        });
    }
    return menus;
};
exports.default = {
    getAll
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("../models/mysql/menu"));
const getAll = async (_req, res) => {
    try {
        const menus = await menu_1.default.getAll();
        res.json(menus);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = {
    getAll
};

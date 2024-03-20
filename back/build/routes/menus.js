"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
const express_1 = require("express");
const menu_1 = __importDefault(require("../controllers/menu"));
// import MenuController from '../controllers/menu'
exports.menuRouter = (0, express_1.Router)();
// GET Retornar listado de menus de distintos restaurantes
exports.menuRouter.get('/', menu_1.default.getAll);

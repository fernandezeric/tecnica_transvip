"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantsRouter = void 0;
const express_1 = require("express");
const restaurant_1 = __importDefault(require("../controllers/restaurant"));
exports.restaurantsRouter = (0, express_1.Router)();
// GET Retornar listado de menus de distintos restaurantes
// GET Retornar listados de menus de un restaurante
exports.restaurantsRouter.get('/', restaurant_1.default.getAll);
exports.restaurantsRouter.get('/:id', restaurant_1.default.getById);
exports.restaurantsRouter.get('/:id/menus', restaurant_1.default.getAllMenus);
exports.restaurantsRouter.get('/:id/menus/:menuId', restaurant_1.default.getMenuById);
// POST Agregar restaurantes
// POST Agregar menu de un restaurante
exports.restaurantsRouter.post('/', restaurant_1.default.create);
exports.restaurantsRouter.post('/:id/menus', restaurant_1.default.createMenu);
// PATCH modificar un restaurant
exports.restaurantsRouter.patch('/:id', restaurant_1.default.update);

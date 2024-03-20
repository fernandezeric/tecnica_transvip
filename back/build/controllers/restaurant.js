"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../models/mysql/restaurant"));
const restaurant_2 = require("../schemas/restaurant");
const menu_1 = require("../schemas/menu");
const getAll = async (_req, res) => {
    try {
        const restaurants = await restaurant_1.default.getAll();
        res.status(200).json(restaurants);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurant_1.default.getById({ id });
        if (restaurant === undefined) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllMenus = async (req, res) => {
    try {
        const { id } = req.params;
        const menus = await restaurant_1.default.getAllMenus({ id });
        res.json(menus);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getMenuById = async (req, res) => {
    try {
        const { id, menuId } = req.params;
        const menu = await restaurant_1.default.getMenuById({ id, menuId });
        res.json(menu);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const create = async (req, res) => {
    try {
        const input = (0, restaurant_2.validateRestaurant)(req.body);
        if (input.error !== undefined) {
            return res.status(422).json({ error: JSON.parse(input.error.message) });
        }
        const newRestaurant = await restaurant_1.default.create({ input: input.data });
        res.status(201).json(newRestaurant);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const input = (0, restaurant_2.validatePartialRestaurant)(req.body);
        if (input.error !== undefined) {
            return res.status(422).json({ error: JSON.parse(input.error.message) });
        }
        const newRestaurant = await restaurant_1.default.update({ id, input: input.data });
        res.status(201).json(newRestaurant);
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const createMenu = async (req, res) => {
    const { id } = req.params;
    const input = (0, menu_1.validateMenu)(req.body);
    if (input.error !== undefined) {
        return res.status(422).json({ error: JSON.parse(input.error.message) });
    }
    const restaurant = await restaurant_1.default.getById({ id });
    if (restaurant === undefined) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    try {
        const newMenu = await restaurant_1.default.createMenu({ id, input: input.data });
        return res.status(201).json(newMenu);
    }
    catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = {
    getAll,
    getById,
    create,
    createMenu,
    getAllMenus,
    getMenuById,
    update
};

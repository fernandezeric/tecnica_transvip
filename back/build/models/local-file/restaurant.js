"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const getAll = async () => {
    return data_json_1.default;
};
const getById = async ({ id }) => {
    // corregir lo del string
    const restaurant = data_json_1.default.find(restaurant => String(restaurant.id) === id);
    return restaurant;
};
const create = async (object) => {
    const newRestaurant = Object.assign({ id: node_crypto_1.default.randomUUID() }, object);
    data_json_1.default.push(newRestaurant);
    return newRestaurant;
};
const createMenu = async ({ id, object }) => {
    // const restaurantIndex = restaurantData.findIndex(restaurant => String(restaurant.id) === id)
    console.log(id, object);
    // restaurantData[restaurantIndex].menu.push(object)
};
exports.default = {
    getAll,
    getById,
    create,
    createMenu
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialMenu = exports.validateMenu = void 0;
const zod_1 = __importDefault(require("zod"));
const dishSchema = zod_1.default.object({
    name: zod_1.default.string(),
    price: zod_1.default.number().positive()
});
const menuSchema = zod_1.default.object({
    name: zod_1.default.string({
        invalid_type_error: 'not valid name',
        required_error: 'need use name for new restaurant'
    }),
    description: zod_1.default.string({
        invalid_type_error: 'error with description',
        required_error: ''
    }),
    dishes: zod_1.default.array(dishSchema).nonempty({
        message: 'dishes must not be empty'
    })
});
const validateMenu = (object) => {
    return menuSchema.safeParse(object);
};
exports.validateMenu = validateMenu;
const validatePartialMenu = (object) => {
    return menuSchema.partial().safeParse(object);
};
exports.validatePartialMenu = validatePartialMenu;

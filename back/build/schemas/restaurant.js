"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialRestaurant = exports.validateRestaurant = void 0;
const zod_1 = __importDefault(require("zod"));
// poner errores más originales
const restaurantSchema = zod_1.default.object({
    name: zod_1.default.string({
        invalid_type_error: 'not valid name',
        required_error: 'need use name for new restaurant'
    }),
    description: zod_1.default.string({
        invalid_type_error: 'error with description',
        required_error: ''
    }),
    phone: zod_1.default.string({
        invalid_type_error: 'error with phone',
        required_error: ''
    }),
    openTime: zod_1.default.string().regex(/^\d{1,2}:\d{2}:\d{2}$/),
    closeTime: zod_1.default.string().regex(/^\d{1,2}:\d{2}:\d{2}$/),
    rate: zod_1.default.number().min(0).max(10)
});
const validateRestaurant = (object) => {
    return restaurantSchema.safeParse(object);
};
exports.validateRestaurant = validateRestaurant;
const validatePartialRestaurant = (object) => {
    return restaurantSchema.partial().safeParse(object);
};
exports.validatePartialRestaurant = validatePartialRestaurant;

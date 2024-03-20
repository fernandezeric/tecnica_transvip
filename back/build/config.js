"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017';
const MYSQL_HOST = (_b = process.env.MYSQL_HOST) !== null && _b !== void 0 ? _b : 'localhost';
const MYSQL_USER = (_c = process.env.MYSQL_USER) !== null && _c !== void 0 ? _c : 'root';
const MYSQL_PORT = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306;
const MYSQL_PASSWORD = (_d = process.env.MYSQL_PASSWORD) !== null && _d !== void 0 ? _d : 'sEND4p455word#';
const MYSQL_DATABASE = (_e = process.env.MYSQL_DATABASE) !== null && _e !== void 0 ? _e : 'restaurantsdb';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const config = {
    mysql: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        port: MYSQL_PORT,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE
    },
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
exports.default = config;

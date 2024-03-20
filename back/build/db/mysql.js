"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("../config"));
let connectionDB;
(async () => {
    exports.connectionDB = connectionDB = await promise_1.default.createConnection(config_1.default.mysql);
})().catch(err => {
    console.error(err);
});

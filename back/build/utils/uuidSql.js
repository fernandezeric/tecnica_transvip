"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUUID = void 0;
const mysql_1 = require("../db/mysql");
const getUUID = async () => {
    const [uuidToDish] = await mysql_1.connectionDB.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidToDish;
    return uuid;
};
exports.getUUID = getUUID;

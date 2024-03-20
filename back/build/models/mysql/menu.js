"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../db/mysql");
const formatMenu_1 = require("../../utils/formatMenu");
const getAll = async () => {
    const [menus] = await mysql_1.connectionDB.query(`SELECT
      BIN_TO_UUID(r.id) AS restaurant_id,
      r.name AS restaurant_name,
      m.name AS menu_name,
      m.description AS menu_description,
      BIN_TO_UUID(m.id) AS menu_id,
      d.name AS dish_name,
      d.price AS dish_price
    FROM restaurant_menu rm
    JOIN menu m ON rm.menu_id = m.id
    JOIN menu_dish md ON m.id = md.menu_id
    JOIN dish d ON md.dish_id = d.id
    JOIN restaurant r ON rm.restaurant_id = r.id;`);
    return (0, formatMenu_1.formatMenuRestaurant)(menus);
};
exports.default = {
    getAll
};

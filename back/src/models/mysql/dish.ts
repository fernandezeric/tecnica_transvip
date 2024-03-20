import { connectionDB } from '../../db/mysql'

// cambiar
const getAll = async (): Promise<any> => {
  const [menus] = await connectionDB.query(
    `SELECT
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
    JOIN restaurant r ON rm.restaurant_id = r.id;`
  )

  return menus
}

export default {
  getAll
}

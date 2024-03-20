import { connectionDB } from '../../db/mysql'
import { formatMenuRestaurant } from '../../utils/formatMenu'
import { MenuWithRestaurantName } from '../../types'

const getAll = async (): Promise<MenuWithRestaurantName[]> => {
  const [menus] = await connectionDB.query(
    `SELECT
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
    JOIN restaurant r ON rm.restaurant_id = r.id;`
  )

  return formatMenuRestaurant(menus)
}

export default {
  getAll
}

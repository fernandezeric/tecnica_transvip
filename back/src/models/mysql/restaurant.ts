import { RestaurantWithoutMenu, Menu } from '../../types'
import { connectionDB } from '../../db/mysql'
import { formatMenu } from '../../utils/formatMenu'
import { getUUID } from '../../utils/uuidSql'

const getAll = async (): Promise<RestaurantWithoutMenu[]> => {
  const [resultQuery] = await connectionDB.query(
    'SELECT name, description, phone, open_time AS openTime, close_time AS closeTime, rate, BIN_TO_UUID(id) id FROM restaurant;'
  )

  return resultQuery
}

const getById = async ({ id }: { id: string }): Promise<RestaurantWithoutMenu> => {
  const [resultQuery] = await connectionDB.query(
    `SELECT name, description, phone, open_time AS openTime, close_time AS closeTime, rate, BIN_TO_UUID(id) id 
      FROM restaurant
      WHERE id = UUID_TO_BIN(?);`,
    [id]
  )

  return resultQuery[0]
}

const getAllMenus = async ({ id }: { id: string }): Promise<Menu[]> => {
  const [menus] = await connectionDB.query(
    `SELECT 
      m.name AS menu_name, 
      m.description AS menu_description, 
      BIN_TO_UUID(m.id) AS menu_id,
      d.name AS dish_name,
      d.price AS dish_price
    FROM restaurant_menu rm
    JOIN menu m ON rm.menu_id = m.id
    JOIN menu_dish md ON m.id = md.menu_id
    JOIN dish d ON md.dish_id = d.id
    WHERE rm.restaurant_id = UUID_TO_BIN(?);`,
    [id]
  )

  return formatMenu(menus)
}

const getMenuById = async ({ id, menuId }: { id: string, menuId: string }): Promise<any> => {
  const [menus] = await connectionDB.query(
    `SELECT 
      m.name AS menu_name, 
      m.description AS menu_description, 
      BIN_TO_UUID(m.id) AS menu_id,
      d.name AS dish_name,
      d.price AS dish_price
    FROM restaurant_menu rm
    JOIN menu m ON rm.menu_id = m.id
    JOIN menu_dish md ON m.id = md.menu_id
    JOIN dish d ON md.dish_id = d.id
    WHERE rm.restaurant_id = UUID_TO_BIN(?)
      AND m.id = UUID_TO_BIN(?);`,
    [id, menuId]
  )
  return formatMenu(menus)[0]
}

const create = async ({ input }: { input: any }): Promise<any> => {
  const {
    name,
    description,
    phone,
    openTime,
    closeTime,
    rate
  } = input

  const uuid = await getUUID()

  try {
    await connectionDB.query(
      `INSERT INTO restaurant (id, name, description, phone, open_time, close_time, rate)
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?)`,
      [uuid, name, description, phone, openTime, closeTime, rate]
    )
  } catch (e) {
    // Pensar en un error, no el de la DB
    console.error(e)
    throw new Error('Error insert new restaurant')
  }

  const restaurant = await getById({ id: uuid })

  return restaurant
}

const createMenu = async ({ id, input }: { id: string, input: any }): Promise<any> => {
  const {
    name,
    description,
    dishes
  } = input

  const restaurant = await getById({ id })
  if (restaurant === undefined) {
    throw new Error('Error find restaurant')
  }

  const uuidMenu = await getUUID()

  try {
    await connectionDB.query(
      `INSERT INTO menu (id, name, description)
        VALUES (UUID_TO_BIN(?), ?, ?)`,
      [uuidMenu, name, description]
    )
    // relacion restaurant_menu
    await connectionDB.query(
      `INSERT INTO restaurant_menu (restaurant_id, menu_id)
      VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))`,
      [id, uuidMenu])

    for (const dish of dishes) {
      const { name: nameDish, price: priceDish } = dish

      const uuidDish = await getUUID()

      await connectionDB.query(
      `INSERT INTO dish (id, name, price)
        VALUES (UUID_TO_BIN(?), ?, ?)`,
      [uuidDish, nameDish, priceDish])

      // crear relación menu_dish
      await connectionDB.query(
        `INSERT INTO menu_dish (menu_id, dish_id)
        VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))`,
        [uuidMenu, uuidDish])
    }
  } catch (e) {
    // Pensar en un error, no el de la DB
    console.error(e)
    throw new Error('Error insert new menu')
  }

  const newMenu = await getMenuById({ id, menuId: uuidMenu })
  return newMenu
}

const update = async ({ id, input }: { id: string, input: any }): Promise<any> => {
  const updateFields = Object.keys(input).map(key => {
    if (`${key}` === 'openTime') return 'open_time = ?'
    else if (`${key}` === 'closeTime') return 'close_time = ?'
    else return `${key} = ?`
  }).join(', ')

  try {
    await connectionDB.query(
      `UPDATE restaurant SET ${updateFields} 
        WHERE id = UUID_TO_BIN(?)`,
      [...Object.values(input), id]
    )
  } catch (e) {
    // Pensar en un error, no el de la DB
    console.error(e)
    throw new Error('Error update restaurant')
  }

  const restaurant = await getById({ id })

  return restaurant
}

export default {
  getAll,
  getById,
  getAllMenus,
  getMenuById,
  create,
  createMenu,
  update
}

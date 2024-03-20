import { Menu, MenuDB, MenuWithRestaurantDB, MenuWithRestaurantName } from '../types'
/**
 * El acumulador como any porque se esta creando un objeto ['id': {}]
 */
/**
 * Para transformar el resultado de menus de la base de datos
 * Y dejarlo en formato json tipo Menu[]
 */
export const formatMenu = (menuDB: MenuDB[]): Menu[] => {
  const formatData = menuDB.reduce((acc: any, item: MenuDB) => {
    if (acc[item.menu_id] === undefined) {
      acc[item.menu_id] = {
        id: item.menu_id,
        name: item.menu_name,
        description: item.menu_description,
        dishes: []
      }
    }
    acc[item.menu_id].dishes.push({
      name: item.dish_name,
      price: item.dish_price
    })
    return acc
  }, {})

  return Object.values(formatData)
}

/**
 * Para transformar la consulta de todos los menus de todos los restaurantes
 * y dejarlo en un formato json amigable
 */
export const formatMenuRestaurant = (menuDB: MenuWithRestaurantDB[]): MenuWithRestaurantName[] => {
  const transformedData = menuDB.reduce((acc: any, item: MenuWithRestaurantDB) => {
    const existingRestaurantIndex = acc.findIndex((rest: MenuWithRestaurantName) => rest.id === item.restaurant_id)

    if (existingRestaurantIndex === -1) {
      acc.push({
        id: item.restaurant_id,
        name: item.restaurant_name,
        menus: [{
          id: item.menu_id,
          name: item.menu_name,
          description: item.menu_description,
          dashes: [{
            name: item.dish_name,
            price: item.dish_price
          }]
        }]
      })
    } else {
      const existingMenuIndex = acc[existingRestaurantIndex].menus.findIndex((menu: Menu) => menu.id === item.menu_id)

      if (existingMenuIndex === -1) {
        acc[existingRestaurantIndex].menus.push({
          id: item.menu_id,
          name: item.menu_name,
          description: item.menu_description,
          dashes: [{
            name: item.dish_name,
            price: item.dish_price
          }]
        })
      } else {
        acc[existingRestaurantIndex].menus[existingMenuIndex].dashes.push({
          name: item.dish_name,
          price: item.dish_price
        })
      }
    }

    return acc
  }, [])

  return transformedData
}

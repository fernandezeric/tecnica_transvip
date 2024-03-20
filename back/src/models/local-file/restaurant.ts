import restaurantData from './data.json'
import crypto from 'node:crypto'

const getAll = async (): Promise<any> => {
  return restaurantData
}

const getById = async ({ id }: { id: string }): Promise<any> => {
  // corregir lo del string
  const restaurant = restaurantData.find(restaurant => String(restaurant.id) === id)

  return restaurant
}

const create = async (object: any): Promise<any> => {
  const newRestaurant = {
    id: crypto.randomUUID(),
    ...object
  }

  restaurantData.push(newRestaurant)

  return newRestaurant
}

const createMenu = async ({ id, object }: { id: string, object: any }): Promise<any> => {
  // const restaurantIndex = restaurantData.findIndex(restaurant => String(restaurant.id) === id)
  console.log(id, object)
  // restaurantData[restaurantIndex].menu.push(object)
}

export default {
  getAll,
  getById,
  create,
  createMenu
}

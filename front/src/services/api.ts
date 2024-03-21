import { type RestaurantWithoutMenu, type MenuWithRestaurantName, type Menu } from "../types/api"

const BASE_PATH = 'http://localhost:3000'
const ORIGIN_URL = 'https://localhost:4321'

export const getAllRestaurants = async () => {
  const rest = await fetch(`${BASE_PATH}/restaurants/`, {
    method: 'GET',
    headers: {
      'Origin': `${ORIGIN_URL}`
    }
  })
  const restaurants = await rest.json() as RestaurantWithoutMenu[]

  return restaurants
}

export const getAllMenus = async () => {
  const rest = await fetch(`${BASE_PATH}/menus/`, {
    method: 'GET',
    headers: {
      'Origin': `${ORIGIN_URL}`
    }
  })

  const menusRestaurants = await rest.json() as MenuWithRestaurantName[]

  return menusRestaurants
}

export const getRestaurantById = async ({ id }: { id: string }) => {
  const rest = await fetch(`${BASE_PATH}/restaurants/${id}`, {
    method: 'GET',
    headers: {
      'Origin': `${ORIGIN_URL}`
    }
  })
  const restaurants = await rest.json() as RestaurantWithoutMenu

  return restaurants
}

export const getAllMenusByRestaurantId = async ({ id }: { id: string }) => {
  const rest = await fetch(`${BASE_PATH}/restaurants/${id}/menus`, {
    method: 'GET',
    headers: {
      'Origin': `${ORIGIN_URL}`
    }
  })
  const restaurants = await rest.json() as Menu[]

  return restaurants
}

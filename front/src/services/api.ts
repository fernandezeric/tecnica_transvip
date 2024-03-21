import { type RestaurantWithoutMenu, type MenuWithRestaurantName, type Menu } from '../types/api'

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

export const getMenuByRestaurantIdAndMenuId = async ({ restaurantId, menuId }: { restaurantId: string, menuId: string }) => {
  const rest = await fetch(`${BASE_PATH}/restaurants/${restaurantId}/menus/${menuId}`, {
    method: 'GET',
    headers: {
      'Origin': `${ORIGIN_URL}`
    }
  })
  const restaurants = await rest.json() as Menu

  return restaurants
}

/**
  {
    "name": "Café Neruda (diagonal)",
    "description": "Especialista en café",
    "phone": "+56212666678",
    "openTime": "13:00:00",
    "closeTime": "3:00:00",
    "rate": 9.9
  }
 */
export const createRestaurant = async ({ data }: { data: any }) => {
  const rest = await fetch(`${BASE_PATH}/restaurants/`, {
    method: 'POST',
    headers: {
      'Origin': `${ORIGIN_URL}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const restaurants = await rest.json()

  return restaurants
}


/**
  {
    "name": "menú de día domingo",
    "description": "para relajarse un día domingo",
    "dishes": [
    {
        "name": "Ensalada de Quínoa y Palta",
        "price": 5500
      }
    ]
  }
 */
  export const createMenuByRestaurantId = async ({ id, data }: { id: string, data: any }) => {
    const rest = await fetch(`${BASE_PATH}/restaurants/${id}/menus`, {
      method: 'POST',
      headers: {
        'Origin': `${ORIGIN_URL}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const restaurants = await rest.json()
  
    return restaurants
  }
  
export interface Dish {
  id: string
  name: string
  price: number
}

export interface Menu {
  id: string
  name: string
  description: string
  dishes: Dish[]
}

// polemico el phone como string y casi todo
export interface Restaurant {
  id: string
  name: string
  description: string
  phone: string
  openTime: Date
  closeTime: Date
  menus: Menu[]
}

export interface MenuDB {
  menu_name: string
  menu_description: string
  menu_id: string
  dish_name: string
  dish_price: Number
  dish_id: string
}

export interface MenuWithRestaurantDB extends MenuDB {
  restaurant_id: string
  restaurant_name: string
}

export type RestaurantWithoutMenu = Omit<Restaurant, 'menus'>
export type MenuWithRestaurantName = Omit<Restaurant, 'description' | 'phone' | 'openTime' | 'closeTime'>

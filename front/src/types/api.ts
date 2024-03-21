export interface Dish {
  name: string
  price: number
}

export interface Menu {
  id: string
  name: string
  description: string
  dishes: Dish[]
}

export interface Restaurant {
  id: string
  name: string
  description: string
  phone: string
  openTime: Date
  closeTime: Date
  menus: Menu[]
}

export type RestaurantWithoutMenu = Omit<Restaurant, 'menus'>
export type MenuWithRestaurantName = Omit<Restaurant, 'description' | 'phone' | 'openTime' | 'closeTime'>

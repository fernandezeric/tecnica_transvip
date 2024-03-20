import RestaurantModelMySQL from '../models/mysql/restaurant'
import { Request, Response } from 'express'
import { validateRestaurant, validatePartialRestaurant } from '../schemas/restaurant'
import { validateMenu } from '../schemas/menu'

const getAll = async (_req: Request, res: Response): Promise<any> => {
  try {
    const restaurants = await RestaurantModelMySQL.getAll()

    res.status(200).json(restaurants)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    const restaurant = await RestaurantModelMySQL.getById({ id })

    if (restaurant === undefined) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    res.json(restaurant)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllMenus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    const menus = await RestaurantModelMySQL.getAllMenus({ id })

    res.json(menus)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getMenuById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id, menuId } = req.params

    const menu = await RestaurantModelMySQL.getMenuById({ id, menuId })

    res.json(menu)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const input = validateRestaurant(req.body)

    if (input.error !== undefined) {
      return res.status(422).json({ error: JSON.parse(input.error.message) })
    }

    const newRestaurant = await RestaurantModelMySQL.create({ input: input.data })

    res.status(201).json(newRestaurant)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    const input = validatePartialRestaurant(req.body)

    if (input.error !== undefined) {
      return res.status(422).json({ error: JSON.parse(input.error.message) })
    }

    const newRestaurant = await RestaurantModelMySQL.update({ id, input: input.data })

    res.status(201).json(newRestaurant)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createMenu = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const input = validateMenu(req.body)

  if (input.error !== undefined) {
    return res.status(422).json({ error: JSON.parse(input.error.message) })
  }

  const restaurant = await RestaurantModelMySQL.getById({ id })

  if (restaurant === undefined) {
    return res.status(404).json({ message: 'Restaurant not found' })
  }

  try {
    const newMenu = await RestaurantModelMySQL.createMenu({ id, input: input.data })

    return res.status(201).json(newMenu)
  } catch (e) {
    console.error('Error:', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getAll,
  getById,
  create,
  createMenu,
  getAllMenus,
  getMenuById,
  update
}

import MenuModel from '../models/mysql/menu'
import { Request, Response } from 'express'

const getAll = async (_req: Request, res: Response): Promise<any> => {
  try {
    const menus = await MenuModel.getAll()

    res.json(menus)
  } catch (e) {
    console.error('Error:', e)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getAll
}

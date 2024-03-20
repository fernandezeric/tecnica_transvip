import { Router } from 'express'
import MenuController from '../controllers/menu'

export const menuRouter = Router()

// GET Retornar listado de menus de distintos restaurantes
menuRouter.get('/', MenuController.getAll)

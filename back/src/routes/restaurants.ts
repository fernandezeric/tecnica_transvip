import { Router } from 'express'
import RestaurantController from '../controllers/restaurant'

export const restaurantsRouter = Router()

// GET Retornar listado de menus de distintos restaurantes
// GET Retornar listados de menus de un restaurante
restaurantsRouter.get('/', RestaurantController.getAll)
restaurantsRouter.get('/:id', RestaurantController.getById)
restaurantsRouter.get('/:id/menus', RestaurantController.getAllMenus)
restaurantsRouter.get('/:id/menus/:menuId', RestaurantController.getMenuById)

// POST Agregar restaurantes
// POST Agregar menu de un restaurante
restaurantsRouter.post('/', RestaurantController.create)
restaurantsRouter.post('/:id/menus', RestaurantController.createMenu)

// PATCH modificar un restaurant
restaurantsRouter.patch('/:id', RestaurantController.update)
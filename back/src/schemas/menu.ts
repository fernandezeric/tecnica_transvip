import z from 'zod'

const dishSchema = z.object({
  name: z.string(),
  price: z.number().positive()
})

const menuSchema = z.object({
  name: z.string({
    invalid_type_error: 'not valid name',
    required_error: 'need use name for new restaurant'
  }),
  description: z.string({
    invalid_type_error: 'error with description',
    required_error: ''
  }),
  dishes: z.array(dishSchema).nonempty({
    message: 'dishes must not be empty'
  })
})

const validateMenu = (object: any): any => {
  return menuSchema.safeParse(object)
}

const validatePartialMenu = (object: any): any => {
  return menuSchema.partial().safeParse(object)
}

export {
  validateMenu,
  validatePartialMenu
}

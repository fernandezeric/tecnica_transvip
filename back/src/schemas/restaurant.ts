import z from 'zod'

// poner errores más originales
const restaurantSchema = z.object({
  name: z.string({
    invalid_type_error: 'not valid name',
    required_error: 'need use name for new restaurant'
  }),
  description: z.string({
    invalid_type_error: 'error with description',
    required_error: ''
  }),
  phone: z.string({
    invalid_type_error: 'error with phone',
    required_error: ''
  }),
  openTime: z.string().regex(/^\d{1,2}:\d{2}:\d{2}$/),
  closeTime: z.string().regex(/^\d{1,2}:\d{2}:\d{2}$/),
  rate: z.number().min(0).max(10)
})

const validateRestaurant = (object: any): any => {
  return restaurantSchema.safeParse(object)
}

const validatePartialRestaurant = (object: any): any => {
  return restaurantSchema.partial().safeParse(object)
}

export {
  validateRestaurant,
  validatePartialRestaurant
}

import express from 'express'
import { restaurantsRouter } from './routes/restaurants'
import { menuRouter } from './routes/menus'
import config from './config'
import { corsMiddleware } from './middlewares/cors'
import { loggerMiddleware } from './middlewares/logs'

const PORT = config.server.port

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware())
app.use(loggerMiddleware)

app.get('/ping', (_req, res) => {
  console.log('pinged here :)')
  res.send('pong, you turn')
})

app.use('/menus', menuRouter)
app.use('/restaurants', restaurantsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

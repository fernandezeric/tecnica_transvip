import { RequestHandler } from 'express'
import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000'
]

interface CorsMiddlewareOptions {
  acceptedOrigins?: string[]
}

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: CorsMiddlewareOptions = {}): RequestHandler => {
  return cors({
    origin: (origin, callback) => {
      if (origin !== undefined && acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (origin !== undefined) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
}

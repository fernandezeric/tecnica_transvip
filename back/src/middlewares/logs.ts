import { Request, Response, NextFunction } from 'express'
import { createLogger, transports, format } from 'winston'
import 'winston-mongodb'

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      db: 'mongodb://localhost:27017/transvip_logs',
      options: { useUnifiedTopology: true },
      collection: 'transvip_logs_request',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
})

/**
 * Aquí se podría configurar para ver más parametros
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const logInfo = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    timestamp: new Date().toISOString()
  }

  logger.info(logInfo)
  next()
}

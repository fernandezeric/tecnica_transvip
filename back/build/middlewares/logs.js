"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const winston_1 = require("winston");
require("winston-mongodb");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.MongoDB({
            db: 'mongodb://localhost:27017/transvip_logs',
            options: { useUnifiedTopology: true },
            collection: 'transvip_logs_request',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
        })
    ]
});
/**
 * Aquí se podría configurar para ver más parametros
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const loggerMiddleware = (req, _res, next) => {
    const logInfo = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        timestamp: new Date().toISOString()
    };
    logger.info(logInfo);
    next();
};
exports.loggerMiddleware = loggerMiddleware;

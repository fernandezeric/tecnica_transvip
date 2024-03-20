"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurants_1 = require("./routes/restaurants");
const menus_1 = require("./routes/menus");
const config_1 = __importDefault(require("./config"));
const cors_1 = require("./middlewares/cors");
const logs_1 = require("./middlewares/logs");
const PORT = config_1.default.server.port;
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use((0, cors_1.corsMiddleware)());
app.use(logs_1.loggerMiddleware);
app.get('/ping', (_req, res) => {
    console.log('pinged here :)');
    res.send('pong, you turn');
});
app.use('/menus', menus_1.menuRouter);
app.use('/restaurants', restaurants_1.restaurantsRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
try {
    process.loadEnvFile();
}
catch (e) {
    console.warn(".env not found", e);
}
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const logger_1 = require("./middlewares/logger");
const sample_routes_1 = __importDefault(require("./routes/sample.routes"));
const config_pro_1 = require("../config/config.pro");
const config_dev_1 = require("../config/config.dev");
let config;
const environment = process.env.NODE_ENV || 'dev';
if (environment === 'pro') {
    config = new config_pro_1.Config();
}
else {
    config = new config_dev_1.Config();
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/sample', sample_routes_1.default);
app.get('/health', (req, res, next) => {
    const healtchCheck = {
        status: 'ok',
        env: environment,
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
        retryLogin: config.retryLogin
    };
    res.status(200).send(healtchCheck);
});
app.use(errorHandler_1.ErrorHandler.handle);
app.use(logger_1.logger);
exports.default = app;

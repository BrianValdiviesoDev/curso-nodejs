"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`[${req.method}] - ${req.path} - ${res.statusCode}`);
    next();
};
exports.logger = logger;

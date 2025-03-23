"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secrets = void 0;
class Secrets {
    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not set as environment variable');
        }
        this.mongoUri = process.env.MONGO_URI;
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not set as environment variable');
        }
        this.jwtSecret = process.env.JWT_SECRET;
    }
}
exports.Secrets = Secrets;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const secrets_1 = require("./secrets");
class Config extends secrets_1.Secrets {
    constructor() {
        super();
        this.retryLogin = 100;
    }
}
exports.Config = Config;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleService = void 0;
const errorFactory_1 = require("../errors/errorFactory");
class SampleService {
    test() {
        throw new errorFactory_1.ServiceUnavailable('Method not implemented');
    }
}
exports.SampleService = SampleService;

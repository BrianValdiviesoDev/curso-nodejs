"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
const sample_service_1 = require("../services/sample.service");
const sampleService = new sample_service_1.SampleService();
class SampleController {
    test() {
        return sampleService.test();
    }
}
exports.SampleController = SampleController;

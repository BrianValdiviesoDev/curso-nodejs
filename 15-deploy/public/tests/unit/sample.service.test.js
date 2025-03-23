"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sample_service_1 = require("../../services/sample.service");
const sampleService = new sample_service_1.SampleService();
it('throw an error', () => {
    expect(() => sampleService.test()).toThrow('Method not implemented');
});

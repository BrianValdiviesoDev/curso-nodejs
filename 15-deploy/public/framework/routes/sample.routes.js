"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_controller_1 = require("../../controllers/sample.controller");
const router = (0, express_1.Router)();
const sampleController = new sample_controller_1.SampleController();
router.get('/', (req, res, next) => {
    try {
        sampleController.test();
        res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;

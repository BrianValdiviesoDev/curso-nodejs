import { NextFunction, Request, Response, Router } from "express";
import { SampleController } from "../../controllers/sample.controller";
import { bruteForceDefense, ddosDefense } from "../middlewares/rate-limiter";

const router = Router()
const sampleController = new SampleController();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        sampleController.test()
        res.status(200).send()
    } catch (e) {
        next(e)
    }    
})

router.get('/dashboard', [ddosDefense], (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send()
    } catch (e) {
        next(e)
    }    
})

router.get('/login', [bruteForceDefense], (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send()
    } catch (e) {
        next(e)
    }    
})


export default router
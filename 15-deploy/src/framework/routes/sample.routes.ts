import { NextFunction, Request, Response, Router } from "express";
import { SampleController } from "../../controllers/sample.controller";

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


export default router
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../../controllers/user.controller";

const router = Router()
const userController = new UserController();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.create(req.body)
        res.status(201).send({user})
    } catch (e) {
        next(e)
    }
})

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userController.list()
        res.status(200).send({users})
    } catch (e) {
        next(e)
    }
})


router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.findById(Number(req.params.id))
        res.status(200).send({user})
    } catch (e) {
        next(e)
    }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.update(Number(req.params.id), req.body)
        res.status(200).send({user})
    } catch (e) {
        next(e)
    }
})

export default router
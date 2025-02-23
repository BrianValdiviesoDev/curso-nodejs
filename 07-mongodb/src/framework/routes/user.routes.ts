import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";

const userController = new UserController()
const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.create(req.body)
        res.status(201).send({user})
    } catch (e) {
        next(e)
    }    
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.findById(req.params.id)
        res.status(200).send({user})
    } catch (e) {
        next(e)
    }    
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.update(req.params.id, req.body)
        res.status(200).send({user})
    } catch (e) {
        next(e)
    }    
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userController.delete(req.params.id)
        res.status(204).send()
    } catch (e) {
        next(e)
    }    
})

export default router
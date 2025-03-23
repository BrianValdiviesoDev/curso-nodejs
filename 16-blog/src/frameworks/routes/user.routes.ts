import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";

const userService = new UserService()
const userController = new UserController(userService)
const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.create(req.body)
        res.status(201).send(user)
    } catch (e) {
        next(e)
    }    
})

router.patch('/:id/rol', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.updateRol(req.params.id, req.body)
        res.status(200).send(user)
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


router.get('/list', async (req: any, res: Response, next: NextFunction) => {
    try {
        const users = await userController.listAll()
        res.status(200).send({users})
    } catch (e) {
        next(e)
    }    
})

router.get('/:id', async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await userController.findById(req.params.id)
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }    
})

export default router
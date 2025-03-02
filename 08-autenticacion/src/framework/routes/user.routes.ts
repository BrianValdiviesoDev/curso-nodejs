import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth";
import { authorizeRole } from "../middlewares/auth.role";
import { Role } from "../../models/user.interface";

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

router.get('/', [verifyJWT], async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await userController.findById(req.user.id)
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

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await userController.login(req.body.email, req.body.password)
        res.status(200).send({token})
    } catch (e) {
        next(e)
    }    
})

router.get('/list', [verifyJWT, authorizeRole([Role.ADMIN])], async (req: any, res: Response, next: NextFunction) => {
    try {
        const users = await userController.list()
        res.status(200).send({users})
    } catch (e) {
        next(e)
    }    
})

export default router
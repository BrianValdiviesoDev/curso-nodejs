import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { IConfig } from "../../config/config.interface";
import { authorizeRole, verifyJWT } from "../middlewares/auth";
import { Rol } from "../../models/user.interface";
import { ForbiddenError } from "../../errors/errorFactory";


export const UserRouter = (config:IConfig) => {

    const userService = new UserService(config.jwtSecret)
    const userController = new UserController(userService)
    const router = Router()


    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await userController.login(req.body.email, req.body.password)
            res.status(200).send({token})
        } catch (e) {
            next(e)
        }    
    })


    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userController.create(req.body)
            res.status(201).send(user)
        } catch (e) {
            next(e)
        }    
    })

    router.patch('/:id/rol',[verifyJWT(config.jwtSecret), authorizeRole([Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userController.updateRol(req.params.id, req.body.rol)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }    
    })

    router.delete('/:id', [verifyJWT(config.jwtSecret)], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            if (user.rol===Rol.ADMIN || user.id === req.params.id) {
                await userController.delete(req.params.id)
                res.status(204).send()
            } else {
                throw new ForbiddenError()
            }
           
        } catch (e) {
            next(e)
        }    
    })


    router.get('/list',[verifyJWT(config.jwtSecret), authorizeRole([Rol.ADMIN])], async (req: any, res: Response, next: NextFunction) => {
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

    return router
}

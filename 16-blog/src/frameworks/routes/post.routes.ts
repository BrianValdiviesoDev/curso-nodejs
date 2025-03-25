import { NextFunction, Router, Request, Response } from "express";
import { IConfig } from "../../config/config.interface";
import { authorizeRole, verifyJWT } from "../middlewares/auth";
import { PostService } from "../../services/post.service";
import { PostController } from "../../controllers/post.controller";
import { Rol } from "../../models/user.interface";


export const PostRouter = (config:IConfig) => {

    const postService = new PostService()
    const postController = new PostController(postService)
    const router = Router()

    router.post('/',[verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await postController.create(req.body, (req as any).user.id)
            res.status(201).send(user)
        } catch (e) {
            next(e)
        }    
    })

    router.put('/:id',[verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await postController.update(req.params.id, req.body)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }    
    })

    router.delete('/:id', [verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            await postController.delete(req.params.id)
            res.status(204).send()
        } catch (e) {
            next(e)
        }    
    })


    router.get('/list', async (req: any, res: Response, next: NextFunction) => {
        try {
            const users = await postController.listAll()
            res.status(200).send({users})
        } catch (e) {
            next(e)
        }    
    })

    router.get('/:id',  [verifyJWT(config.jwtSecret)], async (req: any, res: Response, next: NextFunction) => {
        try {
            const user = await postController.findById(req.params.id)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }    
    })

    return router
}

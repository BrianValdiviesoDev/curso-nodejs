import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";

const userController = new UserController()
const router = Router()


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userController.listAll()
        res.render('home', {users}) 
    } catch (e) {
        next(e)
    }   
    
})


router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userController.findById(req.params.id)
        res.render('profile', {user}) 
    } catch (e) {
        next(e)
    }   
    
})

export default router
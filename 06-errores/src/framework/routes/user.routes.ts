import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { NoContentError, NotFoundError } from "../../errors/errorFactory";

const router = Router()
const userController = new UserController()

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = userController.create(user);
        res.status(200).send({users:result}) 
    } catch (e) {
        next(e)
    }  
})

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = String(req.query.email);
        const list = userController.list(email);
        if (list.length < 1) {
            throw new NoContentError("Users not found with this filter")
        }
        res.status(200).send({users:list})
    } catch (e) {
        next(e)
    }
    
})

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userController.findById(req.params.id);
        res.status(200).send({user:user})
    } catch (e) {
        next(e)
    }
    
})

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = userController.update(id, user);
        res.status(200).send(result)
    } catch (e) {
        next(e)
    }
    
})

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        userController.delete(id)
        res.status(204).send()
    } catch (e:any) {
        next(e)
    }
})

export default router
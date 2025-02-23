import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../../controllers/user.controller";

const router = Router()
const userController = new UserController()

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = userController.create(user);
        res.status(200).send({users:result})
    } catch (e:any) {
        res.status(404).send(e.message)
    }
})

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const email = String(req.query.email);
    const list = userController.list(email);
    if (list.length < 1) {
        res.status(204).send()
        return
    }
    res.status(200).send({users:list})
})

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const user = userController.findById(req.params.id);
    if (!user) {
        res.status(404).send("User not found")
        return;
    }
    res.status(200).send({user:user})
})

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = req.body;
    const result = userController.update(id, user);
    if (!result) {
        res.status(404).send('User not found')
        return
    }
    res.status(200).send(result)
})

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        userController.delete(id)
        res.status(204).send()
    } catch (e:any) {
        res.status(404).send(e.message)
    }
})

export default router
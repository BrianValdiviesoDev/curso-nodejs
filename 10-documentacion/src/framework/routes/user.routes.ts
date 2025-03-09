import { NextFunction, Router, Request, Response } from "express";
import { UserController } from "../../controllers/user.controller";

const userController = new UserController()
const router = Router()
/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Crea un nuevo usuario
 *      description: Registra un nuevo usuario en la base de datos.
 *      tags:
 *          - Usuarios
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: nombre del usuario
 *                          email:
 *                              type: string
 *                              description: email del usuario
 *      responses:
 *          201:
 *              description: Usuario creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  $ref: "#/components/schemas/User"
 */
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
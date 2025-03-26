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

    /**
   * @openapi
   * /api/users/login:
   *   post:
   *     summary: Login de usuario
   *     description: Autentica un usuario y devuelve un JWT.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "johndoe@example.com"
   *               password:
   *                 type: string
   *                 example: "securepassword123"
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *     tags: 
   *      - Users
   */
    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await userController.login(req.body.email, req.body.password)
            res.status(200).send({token})
        } catch (e) {
            next(e)
        }    
    })


    /**
   * @openapi
   * /api/users/:
   *   post:
   *     summary: Crea un nuevo usuario
   *     description: Registra un nuevo usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/User"
   *     responses:
   *       201:
   *         description: Usuario creado
   *     tags: 
   *      - Users
   */
    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userController.create(req.body)
            res.status(201).send(user)
        } catch (e) {
            next(e)
        }    
    })

    /**
   * @openapi
   * /api/users/{id}/rol:
   *   patch:
   *     summary: Actualiza el rol de un usuario
   *     description: Permite a un administrador actualizar el rol de otro usuario
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               rol:
   *                 type: string
   *                 enum: [ADMIN, EDITOR, VISITANTE]
   *     responses:
   *       200:
   *         description: ok
   *     tags: 
   *      - Users
   */
    router.patch('/:id/rol',[verifyJWT(config.jwtSecret), authorizeRole([Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userController.updateRol(req.params.id, req.body.rol)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }    
    })

    /**
   * @openapi
   * /api/users/{id}:
   *   delete:
   *     summary: Borra un usuario
   *     description: Permite a un usuario borrar su propia cuenta o a un administrador borrar la cuenta de otro usuario
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Borrado
   *     tags: 
   *      - Users
   */
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

    /**
   * @openapi
   * /api/users/list:
   *   get:
   *     summary: Listado de usuarios
   *     description: Devuelve un listado de usuarios
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: array
   *                   items:
   *                     $ref: "#/components/schemas/User"
   *     tags: 
   *      - Users
   */
    router.get('/list',[verifyJWT(config.jwtSecret), authorizeRole([Rol.ADMIN])], async (req: any, res: Response, next: NextFunction) => {
        try {
            const users = await userController.listAll()
            res.status(200).send({users})
        } catch (e) {
            next(e)
        }    
    })

    /**
   * @openapi
   * /api/users/{id}:
   *   get:
   *     summary: Busca un usuario por ID
   *     description: Devuelve un usuario por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/User"
   *     tags: 
   *      - Users
   */
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

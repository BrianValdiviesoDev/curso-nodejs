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

    /**
     * @openapi
     * /api/posts:
     *   post:
     *     summary: Crear un nuevo post
     *     description: Crea un post nuevo.
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Post"
     *     responses:
     *       201:
     *         description: Post creado
     *     tags: 
     *      - Posts
     */
    router.post('/',[verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await postController.create(req.body, (req as any).user.id)
            res.status(201).send(user)
        } catch (e) {
            next(e)
        }    
    })

    /**
     * @openapi
     * /api/posts/{id}:
     *   put:
     *     summary: Actualizar un post
     *     description: Actualiza un post existente.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "651f3cdd8f9b4a2c3e4f1a9b"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/Post"
     *     responses:
     *       200:
     *         description: Post actualizado
     *     tags: 
     *      - Posts
     */
    router.put('/:id',[verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await postController.update(req.params.id, req.body)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }    
    })

    /**
     * @openapi
     * /api/posts/{id}:
     *   delete:
     *     summary: Eliminar un post
     *     description: Elimina un post por su ID.
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "651f3cdd8f9b4a2c3e4f1a9b"
     *     responses:
     *       204:
     *         description: Post eliminado
     *     tags: 
     *      - Posts
     */
    router.delete('/:id', [verifyJWT(config.jwtSecret), authorizeRole([Rol.EDITOR, Rol.ADMIN])], async (req: Request, res: Response, next: NextFunction) => {
        try {
            await postController.delete(req.params.id)
            res.status(204).send()
        } catch (e) {
            next(e)
        }    
    })

    /**
     * @openapi
     * /api/posts/list:
     *   get:
     *     summary: Listado de posts
     *     description: Devuelve una lista con todos los posts
     *     responses:
     *       200:
     *         description: ok
     *     tags: 
     *      - Posts
     */
    router.get('/list', async (req: any, res: Response, next: NextFunction) => {
        try {
            const users = await postController.listAll()
            res.status(200).send({users})
        } catch (e) {
            next(e)
        }    
    })

    /**
     * @openapi
     * /api/posts/{id}:
     *   get:
     *     summary: Busca un post por ID
     *     description: Devuelve un post por su ID
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "651f3cdd8f9b4a2c3e4f1a9b"
     *     responses:
     *       200:
     *         description: ok
     *     tags: 
     *      - Posts
     */
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

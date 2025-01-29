import { NextFunction, Router, Request, Response } from "express";
import { createUser, UserController } from "../../controllers/user.controllers";

const userRouter = Router()
const userController = new UserController();

userRouter.post("/", createUser) //Controller como handler

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log("GET / recibido")
    console.log(req.headers)
    console.log(req.query)
    res.status(200).send('Recibido')
})

userRouter.get('/find',(req: Request, res: Response, next: NextFunction) => {
    console.log("GET /find recibido")
    res.redirect('list')
})

//Controller como clase
userRouter.get('/list',(req: Request, res: Response, next: NextFunction) => {
    console.log("GET /list recibido")
    const result = userController.list();
    res.status(200).send(result)
})

userRouter.get('/:id',(req: Request, res: Response, next: NextFunction) => {
    console.log("GET /:id recibido")
    console.log(req.params)
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Curso Node</title>
        </head>
        <body>
          <div style="text-align: center; margin-top: 50px;">
            <h1>Tu usuario es Brian Valdivieso con id: ${req.params.id}</h1>
          </div>
        </body>
        </html>
    `)
})

userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
    console.log("POST /login recibido")
    console.log(req.body)    
    res.cookie('curso_node_cookie', "test")
    res.set('header_curso_node', "testing")
    res.status(200).send('Logged')
})

//Controller como clase
userRouter.put("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("PUT / recibido")
    if (!req.body.name) {
        res.status(400).send("Name is required")
        return;
    }
    const result = userController.update(req.body.name);
    res.status(200).send(result)
})



export { userRouter }
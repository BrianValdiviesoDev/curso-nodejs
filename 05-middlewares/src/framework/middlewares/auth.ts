import { NextFunction, Request, Response } from "express"

export const auth = ((req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization == "abc") {
        console.log("Usuario autenticado")
    } else {
        console.log("Usuario NO autenticado")
        res.status(403).send()
        return
    }
    next()
})

export const checkRole = ((req: Request, res: Response, next: NextFunction) => {
    if (req.headers.rol && req.headers.rol == "admin") {
        console.log("Welcome admin!")
    } else {
        console.log("Wrong role")
        res.status(403).send()
        return
    }
    next()
})
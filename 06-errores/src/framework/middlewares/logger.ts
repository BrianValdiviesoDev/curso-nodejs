import { NextFunction, Request, Response } from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Petición ${req.method} - ${req.path} (${res.statusCode})`)
    next()
}
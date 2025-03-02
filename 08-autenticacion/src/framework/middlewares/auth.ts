import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../errors/errorFactory";
import jwt from "jsonwebtoken"

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    //Authorization: "Bearer tu_token"
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) throw new ForbiddenError("Missing token")
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = decoded;
        next()
    } catch (e:any) {
        console.error(e.message)
        throw new ForbiddenError("Invalid token")
    }
}
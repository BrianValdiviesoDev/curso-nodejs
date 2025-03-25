import { NextFunction, Response } from "express";
import { ForbiddenError } from "../../errors/errorFactory";
import jwt from "jsonwebtoken"
import { Rol } from "../../models/user.interface";

export const verifyJWT = (jwtSecret: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) throw new ForbiddenError("Missing token")
        
        try {
            const decoded = jwt.verify(token, jwtSecret)
            req.user = decoded;
            next()
        } catch (e:any) {
            console.error(e.message)
            throw new ForbiddenError("Invalid token")
        }
    }
}

export const authorizeRole = (allowedRoles: Rol[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        const userRole = req.user?.rol
        if (!userRole) throw new ForbiddenError("Rol not found")
        
        if (!allowedRoles.includes(userRole)) throw new ForbiddenError("Your rol is not allowed")
        
        next()
    }
}
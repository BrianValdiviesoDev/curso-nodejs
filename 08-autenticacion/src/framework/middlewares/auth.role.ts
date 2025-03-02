import { NextFunction, Request, Response } from "express";
import { Role } from "../../models/user.interface";
import { ForbiddenError } from "../../errors/errorFactory";

export const authorizeRole = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role
        if (!userRole) throw new ForbiddenError("Role not found")
        
        if (!allowedRoles.includes(userRole)) throw new ForbiddenError("Your role is not allowed")
        
        next()
    }
}
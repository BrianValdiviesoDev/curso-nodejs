import { NextFunction, Request, Response } from "express";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    console.log("POST / recibido")
    console.log(req.body)
    res.status(201).send({user: req.body})
}

class UserController {
    update(name: string): Record<string, string>{
        return {
            name: name,
            email: "update@test.com"
        }
    }

    list():Record<string,string>[] {
        console.log("Listando usuarios...");
        return [
            {
                name: "test",
                email: "test@test.com"
            },
            {
                name: "test2",
                email: "test2@test.com"
            }
        ];
    }
}

export {createUser, UserController}
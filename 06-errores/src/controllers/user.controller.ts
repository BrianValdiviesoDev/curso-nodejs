import { BadParametersError } from "../errors/errorFactory";
import { IUser } from "../models/user.interfaces";
import { UserService } from "../services/user.service";

const userService = new UserService()

export class UserController{
    create(user: IUser): IUser[]{
        if (!user.email || user.email == "") {
            throw new BadParametersError("Email is required")
        }
        return userService.save(user);
    }

    list(email?:string): IUser[]{
        return userService.list(email)
    }

    findById(id: string): IUser{
        return userService.findById(id);
    } 

    update(id: string, user: IUser): IUser{
        return userService.update(id, user)
    }

    delete(id: string): void{
        return userService.delete(id)
    }
}
import { IUser } from "../models/user.interface";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController{
    async create(user: IUser): Promise<IUser>{
        return await userService.create(user);
    }

    async findById(id: number): Promise<IUser>{
        return await userService.findById(id)
    }

    async update(id: number, user: IUser): Promise<IUser>{
        return await userService.update(id, user)
    }

    async list(): Promise<IUser[]>{
        return await userService.findAll()
    }
}
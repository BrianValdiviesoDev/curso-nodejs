import { IUser } from "../models/user.interface"
import { UserService } from "../services/user.service"

const userService = new UserService()

export class UserController{
    async create(user: IUser): Promise<IUser>{
        return await userService.create(user)
    }

    async findById(id: string): Promise<IUser | null>{
        return await userService.findById(id)
    }

    async update(id: string, user: IUser): Promise<IUser>{
        return await userService.update(id, user)
    }

    async delete(id: string): Promise<void>{
        await userService.delete(id)
    }

    async listAll(): Promise<IUser[]>{
        return await userService.listAll()
    }
}
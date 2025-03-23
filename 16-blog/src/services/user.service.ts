import { NotFoundError } from "../errors/errorFactory";
import { IUser, Rol } from "../models/user.interface";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"

export class UserService {
    async create(user: IUser): Promise<IUser>{
        const hashedPassord = await bcrypt.hash(user.password, 10)
        user.password = hashedPassord
        return await UserModel.create(user)
    }

    async listAll(): Promise<IUser[]>{
        return await UserModel.find()
    }
    
    async findById(id: string): Promise<IUser | null>{
        return await UserModel.findById(id)
    }

    async updateRol(id: string, rol: Rol): Promise<IUser>{
        const updated = await UserModel.findByIdAndUpdate(id, {$set:{rol}}, { new: true })
        if (!updated) {
            throw new NotFoundError("User not found")
        }
        return updated
    }

    async delete(id: string): Promise<void>{
        await UserModel.deleteOne({_id:id})
    }
}
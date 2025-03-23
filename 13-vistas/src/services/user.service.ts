import { NotFoundError } from "../errors/errorFactory";
import { IUser } from "../models/user.interface";
import UserModel from "../models/user.model";

export class UserService{
    async create(user: IUser): Promise<IUser>{
        return await UserModel.create(user)
    }

    async findById(id: string): Promise<IUser | null>{
        return await UserModel.findById(id)
    }

    async update(id: string, user: IUser): Promise<IUser>{
        const updated = await UserModel.findByIdAndUpdate(id, user, { new: true })
        if (!updated) {
            throw new NotFoundError("User not found")
        }
        return updated
    }

    async delete(id: string): Promise<void>{
        await UserModel.deleteOne({_id:id})
    }

    async listAll(): Promise<IUser[]>{
        return await UserModel.find()
    }
}
import { NotFoundError } from "../errors/errorFactory";
import { IUser } from "../models/user.interface";
import { User } from "../models/user.model";

export class UserService{
    async create(user: IUser): Promise<IUser>{
        return await User.create(user)
    }

    async findById(id: number): Promise<IUser>{
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError("User not found")
        }
        return user
    }

    async update(id:number, user: IUser): Promise<IUser>{
        const updatedRows = await User.update(
            user,
            {
                where: {
                    id:id
                }
            }
        )

        if (updatedRows[0] < 1) {
            throw new NotFoundError("User not found")
        }

        const savedUser = await User.findByPk(id)
        return savedUser!;
    }

    async findAll(): Promise<IUser[]>{
        return await User.findAll()
    }
}
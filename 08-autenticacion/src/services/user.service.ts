import { ForbiddenError, NotFoundError } from "../errors/errorFactory";
import { IUser } from "../models/user.interface";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class UserService{
    private jwt_secret: string;
    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not found")
        }
        this.jwt_secret = process.env.JWT_SECRET
    }

    async create(user: IUser): Promise<IUser>{
        const hashedPassord = await bcrypt.hash(user.password, 10)
        user.password = hashedPassord
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

    async login(email: string, password: string): Promise<string>{
        const user = await UserModel.findOne({ email })
        if (!user) throw new ForbiddenError("Invalid credentials")
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new ForbiddenError("Invalid credentials")
        
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(payload, this.jwt_secret, { expiresIn: '1h' })
        return token
    }

    async list(): Promise<IUser[]>{
        return await UserModel.find()
    }
}
import { ForbiddenError, NotFoundError } from "../errors/errorFactory";
import { IUser, Rol } from "../models/user.interface";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class UserService {
    jwtSecret:string

    constructor(jwtSecret:string) {
        this.jwtSecret=jwtSecret
    }

    async login(email: string, password: string): Promise<string>{
        const user = await UserModel.findOne({ email })
        if (!user) throw new ForbiddenError("Invalid credentials")
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new ForbiddenError("Invalid credentials")
        
        const payload = {
            id: user.id,
            email: user.email,
            rol: user.rol
        }

        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' })
        return token
    }
    
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
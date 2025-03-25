import { NotFoundError } from "../errors/errorFactory";
import { IUser, Rol } from "../models/user.interface";
import { UserService } from "../services/user.service";

export class UserController {
    userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService
    }

    async login(email: string, password: string): Promise<string>{
        return await this.userService.login(email, password)
    }

    async create(user: IUser): Promise<IUser> {
        user.rol = Rol.VISITANTE
        return await this.userService.create(user)
    }

    async listAll(): Promise<IUser[]> {
        return await this.userService.listAll()
    }

    async findById(id:string): Promise<IUser>{
        const user = await this.userService.findById(id)
        if(!user) throw new NotFoundError('User not found')
        return user
    }

    async updateRol(id: string, rol: Rol): Promise<IUser> {
        return await this.userService.updateRol(id, rol)
    }

    async delete(id: string): Promise<void> {
        return await this.userService.delete(id)
    }
}
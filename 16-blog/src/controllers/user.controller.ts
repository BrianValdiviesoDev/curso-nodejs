import { IUser, Rol } from "../models/user.interface";
import { UserService } from "../services/user.service";

export class UserController {
    userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService
    }

    async create(user: IUser) {
        return await this.userService.create(user)
    }

    async listAll() {
        return await this.userService.listAll()
    }

    async findById(id:string){
        return await this.userService.findById(id)
    }

    async updateRol(id: string, rol: Rol) {
        return await this.userService.updateRol(id, rol)
    }

    async delete(id: string) {
        return await this.userService.delete(id)
    }
}
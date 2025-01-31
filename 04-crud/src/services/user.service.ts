import { randomUUID } from "crypto";
import { IUser } from "../models/user.interfaces";
import { db } from "../framework/db";

export class UserService{
    save(user: IUser): IUser[]{
        user.id = randomUUID();
        db.push(user)
        return db
    }

    list(email?: string): IUser[]{
        if (email) {
            return db.filter((user:IUser)=>user.email.includes(email))
        }
        return db;
    }

    findById(id: string): IUser | null{
        const user = db.find((user: IUser) => user.id == id);
        if (!user) {
            return null
        }
        return user
    }

    update(id:string, user: IUser): IUser | null{
        const index = db.findIndex((user: IUser) => user.id == id)
        if (index < 0) { return null }
        db[index] = user
        return db[index]
    }

    delete(id: string): void{
        const index = db.findIndex((user: IUser) => user.id == id)
        if (index < 0) {
            throw new Error("User not found")
        }
        db.splice(index, 1)[0];
        return
    }
}
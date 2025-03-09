import {MongoMemoryServer} from "mongodb-memory-server";
import { IUser } from "../../models/user.interface";
import { UserService } from "../../services/user.service"
import mongoose from "mongoose";
import UserModel from "../../models/user.model";

describe('UserService', () => {
    let userService: UserService;
    let mongoServer: MongoMemoryServer;
    
    beforeAll(async () => {
        userService = new UserService()
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = await mongoServer.getUri()
        await mongoose.connect(mongoUri)
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    describe('create user', () => {
        afterEach(async () => {
            await UserModel.deleteMany()
        })

        it('creates a user', async () => {
            const user:IUser={
                name: "test",
                email: "test@test.com"
            }
            const result = await userService.create(user)
            expect(result.email).toBe(user.email)
        })
    })
})
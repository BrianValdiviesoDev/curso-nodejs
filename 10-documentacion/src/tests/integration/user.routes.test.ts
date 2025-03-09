import { MongoMemoryServer } from "mongodb-memory-server"
import { Express } from "express"
import mongoose from "mongoose";
import server from "../../framework/server"
import request from "supertest"
import UserModel from "../../models/user.model";

describe('UserRouter', () => {
    let mongoServer: MongoMemoryServer;
    let app: Express
    
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri)
        app = await server(mongoUri)
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    describe('POST /api/users/', () => {
        it('returns a 201 status code', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({
                    name: "Test supertest",
                    email: "test@supertest.com"
                })
            
            expect(res.statusCode).toBe(201)
            expect(res.body.user).toHaveProperty('_id')

            const user = await UserModel.findOne({ email: "test@supertest.com" })
            expect(user).not.toBeNull()
        })

        it('returns a 400 status code if body is empty', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({})
            
            expect(res.statusCode).toBe(400)
        })
    })
})
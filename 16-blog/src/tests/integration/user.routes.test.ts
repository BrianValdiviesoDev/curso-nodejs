import { MongoMemoryServer } from "mongodb-memory-server"
import { Express } from "express"
import mongoose, { Types } from "mongoose";
import server from "../../frameworks/server";
import request from "supertest"
import { IUser, Rol } from "../../models/user.interface";
import UserModel from "../../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

describe('UserRouter', () => {
    let mongoServer: MongoMemoryServer;
    let app: Express
    let token: string;
    let jwtSecret: string = 'secret'
    
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri();
        process.env.MONGO_URI = mongoUri
        process.env.JWT_SECRET=jwtSecret
        await mongoose.connect(mongoUri)
        app = await server()
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    beforeEach(async () => {
        const payload = {
            id: new Types.ObjectId(),
            email: "admin@test.com",
            rol: Rol.ADMIN,
        }
        token = jwt.sign( payload , jwtSecret, {expiresIn: "1h" });
    })

    afterEach(async () => {
        await UserModel.deleteMany({})
    })

    describe('POST /api/users/login', () => {
        const user: IUser = {
            name: "test",
            email: "test@test.com",
            password: "123456",
            rol: Rol.ADMIN
        }
        beforeAll(async () => {
            const hashedPassord = await bcrypt.hash(user.password, 10)
            await UserModel.create({...user, password:hashedPassord})
        })
        it('returns a token', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: user.email,
                    password: user.password
                })
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('token')
        })

        it('returns a 403 error if credentials are wrong', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'fake',
                    password: 'fake'
                })
            
            expect(res.statusCode).toBe(403)
        })
    })

    describe('POST /api/users/', () => {
        const user: IUser = {
            name: "test",
            email: "test@test.com",
            password: "123456",
            rol: Rol.ADMIN
        }

        it('returns a 200 and creates a user', async () => {
            const user:IUser={
                name: "test",
                email: "test",
                password: "test",
                rol: Rol.ADMIN
            }
            const res = await request(app)
                .post('/api/users/')
                .send({
                    email: user.email,
                    password: user.password
                })
            
            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty("_id")
        })

        it('returns a 400 error if email is empty', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({})
            
            expect(res.statusCode).toBe(500)
        })
    })

    describe("PATCH /api/users/:id/rol", () => {
        it("updates a user's role", async () => {
            const newUser = await UserModel.create({
                name: "Test User",
                email: "testuser2@test.com",
                password: await bcrypt.hash("password", 10),
                rol: Rol.VISITANTE,
            });

            const res = await request(app)
                .patch(`/api/users/${newUser._id}/rol`)
                .set("Authorization", `Bearer ${token}`)
                .send({ rol: Rol.EDITOR });
            expect(res.statusCode).toBe(200);
            expect(res.body.rol).toBe(Rol.EDITOR);
        });

        it("returns 404 if user not exists", async () => {
            const res = await request(app)
                .patch(`/api/users/${new Types.ObjectId().toString()}/rol`)
                .set("Authorization", `Bearer ${token}`)
                .send({ rol: Rol.EDITOR });
            expect(res.statusCode).toBe(404);
        });

        it("returns 403 if unauthorized", async () => {
            const newUser = await UserModel.create({
                name: "Another User",
                email: "anotheruser@test.com",
                password: await bcrypt.hash("password", 10),
                rol: Rol.VISITANTE,
            });

            const res = await request(app)
                .patch(`/api/users/${newUser._id}/rol`)
                .send({ rol: Rol.ADMIN });

            expect(res.statusCode).toBe(403);
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("deletes a user", async () => {
            const newUser = await UserModel.create({
                name: "To Be Deleted",
                email: "delete@test.com",
                password: await bcrypt.hash("password", 10),
                rol: Rol.VISITANTE,
            });

            const res = await request(app)
                .delete(`/api/users/${newUser._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(204);
        });

        it("returns 403 if unauthorized", async () => {
            const newUser = await UserModel.create({
                name: "Unauthorized Delete",
                email: "unauth@test.com",
                password: await bcrypt.hash("password", 10),
                rol: Rol.VISITANTE,
            });

            const res = await request(app).delete(`/api/users/${newUser._id}`);

            expect(res.statusCode).toBe(403);
        });

        it("returns 403 if rol is not ADMIN", async () => {
            const newUser = await UserModel.create({
                name: "Unauthorized Delete",
                email: "unauth@test.com",
                password: await bcrypt.hash("password", 10),
                rol: Rol.VISITANTE,
            });
            const payload = {
                id: new Types.ObjectId(),
                email: "admin@test.com",
                rol: Rol.VISITANTE,
            }
            const token = jwt.sign( payload , jwtSecret, {expiresIn: "1h" });
            const res = await request(app)
                .delete(`/api/users/${newUser._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });

    describe("GET /api/users/list", () => {
        let users=[
            {
                _id: new Types.ObjectId(),
                name: "test1",
                email: "test1@test.com",
                password: "password",
                rol: Rol.VISITANTE
            }, {
                _id: new Types.ObjectId(),
                name: "test2",
                email: "test2@test.com",
                password: "password",
                rol: Rol.ADMIN
            }, {
                _id: new Types.ObjectId(),
                name: "test3",
                email: "test3@test.com",
                password: "password",
                rol: Rol.EDITOR
            }, {
                _id: new Types.ObjectId(),
                name: "test4",
                email: "test4@test.com",
                password: "password",
                rol: Rol.VISITANTE
            }
        ];

        beforeAll(async() => {
            await UserModel.create(users)
        })
        it("returns a list of users", async () => {
            const res = await request(app)
                .get("/api/users/list")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.users.length).toBeGreaterThan(0);
        });

        it("returns 403 if unauthorized", async () => {
            const res = await request(app).get("/api/users/list");

            expect(res.statusCode).toBe(403);
        });
    });

    describe("GET /api/users/:id", () => {
        let visitante = {
            _id: new Types.ObjectId(),
            name: "To Be Deleted",
            email: "guest@test.com",
            password: '1234',
            rol: Rol.VISITANTE,
        }
        beforeAll(async () => {
            await UserModel.create(visitante);
        })
        it("returns a user by ID", async () => {
            const res = await request(app).get(`/api/users/${visitante._id.toString()}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("email", visitante.email);
        });

        it("returns 404 if user is not found", async () => {
            const res = await request(app).get(`/api/users/${new mongoose.Types.ObjectId()}`);

            expect(res.statusCode).toBe(404);
        });
    });
})
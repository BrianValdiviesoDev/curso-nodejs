import {MongoMemoryServer} from "mongodb-memory-server";
import { IUser, Rol } from "../../models/user.interface";
import { UserService } from "../../services/user.service"
import mongoose, { Types } from "mongoose";
import UserModel, { UserDocument } from "../../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


describe('UserService', () => {
    let userService: UserService;
    let mongoServer: MongoMemoryServer;
    const jwtSecret:string="secret"
    beforeAll(async () => {
        userService = new UserService(jwtSecret)
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = await mongoServer.getUri()
        await mongoose.connect(mongoUri)
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })



    describe('login', () => {
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
        it('throws an error if user not exists', async () => {
            await expect(userService.login('fake@test.com', '12345')).rejects.toThrow('Invalid credentials');
        })
        
        it('throws an error if password is incorrect', async () => {
            await expect(userService.login(user.email, 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
        
        it('returns a token', async () => {
            const token = await userService.login(user.email, user.password);
            expect(typeof token).toBe('string');
            const decoded = jwt.verify(token, jwtSecret);
            expect(decoded).toHaveProperty('id');
            expect(decoded).toHaveProperty('email', user.email);
            expect(decoded).toHaveProperty('rol', user.rol);
        });
    })

    describe('User CRUD operations', () => {
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
        

        it('creates a user', async () => {
            const newUser: IUser = {
                name: "new user",
                email: "newuser@test.com",
                password: "password",
                rol: Rol.VISITANTE
            };
            const createdUser = await userService.create(newUser);
            expect(createdUser).toHaveProperty('_id');
            expect(createdUser.email).toBe(newUser.email);
        });

        it('lists all users', async () => {
            const users = await userService.listAll();
            expect(users.length).toBe(users.length);
        });

        it('finds a user by ID', async () => {
            const user = await userService.findById(users[0]._id.toString());
            expect(user).not.toBeNull();
            expect(user?.email).toBe(users[0].email);
        });

        it('updates a user role', async () => {
            const updatedUser = await userService.updateRol(users[0]._id.toString(), Rol.EDITOR);
            expect(updatedUser.rol).toBe(Rol.EDITOR);
        });

        it('throws an error if updating role of non-existing user', async () => {
            await expect(userService.updateRol(new mongoose.Types.ObjectId().toString(), Rol.ADMIN))
                .rejects.toThrow('User not found');
        });

        it('deletes a user', async () => {
            await userService.delete(users[0]._id.toString());
            const user = await userService.findById(users[0]._id.toString());
            expect(user).toBeNull();
        });
    });
})
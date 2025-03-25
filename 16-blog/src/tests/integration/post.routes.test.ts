import mongoose, { Types } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import bcrypt from "bcryptjs";
import { Express } from "express";
import jwt from "jsonwebtoken";
import server from "../../frameworks/server";
import { IUser, Rol } from "../../models/user.interface";
import UserModel from "../../models/user.model";
import { IPost } from "../../models/post.interface";
import PostModel from "../../models/post.model";

describe("PostRouter", () => {
    let mongoServer: MongoMemoryServer;
    let app: Express;
    let tokenEditor: string;
    let tokenAdmin: string;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        process.env.MONGO_URI = mongoUri;
        process.env.JWT_SECRET = "secret";
        await mongoose.connect(mongoUri);
        app = await server();

        const editorUser = {
            _id: new mongoose.Types.ObjectId(),
            name: "Editor User",
            email: "editor@test.com",
            password: "123456",
            rol: Rol.EDITOR,
        };
        const adminUser = {
            _id: new mongoose.Types.ObjectId(),
            name: "Admin User",
            email: "admin@test.com",
            password: "123456",
            rol: Rol.ADMIN,
        };

        const hashedEditorPassword = await bcrypt.hash(editorUser.password, 10);
        const hashedAdminPassword = await bcrypt.hash(adminUser.password, 10);

        const createdEditor = await UserModel.create({ ...editorUser, password: hashedEditorPassword });
        const createdAdmin = await UserModel.create({ ...adminUser, password: hashedAdminPassword });

        tokenEditor = jwt.sign({ id: createdEditor._id, email: createdEditor.email, rol: createdEditor.rol }, "secret", {
            expiresIn: "1h",
        });

        tokenAdmin = jwt.sign({ id: createdAdmin._id, email: createdAdmin.email, rol: createdAdmin.rol }, "secret", {
            expiresIn: "1h",
        });

        const post: IPost = {
            title: "Test Post",
            content: "This is a test post",
            author: editorUser._id.toString(),
            publishedAt: new Date(),
        };

    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    const post = {
        _id: new mongoose.Types.ObjectId(),
        title: "Test Post",
        content: "This is a test post",
        author: new mongoose.Types.ObjectId(),
        publishedAt: new Date(),
    };
    beforeEach(async () => {
        await PostModel.create(post);
    });

    afterEach(async () => {
        await PostModel.deleteMany({})
    })

    describe("POST /api/posts/", () => {
        it("should create a post when authorized", async () => {
            const newPost: IPost = {
                title: "New Test Post",
                content: "Content for the new test post",
                author: "",
                publishedAt: new Date(),
            };

            const res = await request(app)
                .post("/api/posts/")
                .set("Authorization", `Bearer ${tokenEditor}`)
                .send(newPost);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("_id");
        });

        it("should return 403 when unauthorized", async () => {
            const res = await request(app)
                .post("/api/posts/")
                .send({ title: "Unauthorized Post", content: "This should not work" });

            expect(res.statusCode).toBe(403);
        });

        it("should return 500 if body is empty", async () => {
            const res = await request(app)
                .post("/api/posts/")
                .set("Authorization", `Bearer ${tokenEditor}`)
                .send({});

            expect(res.statusCode).toBe(500);
        });
    });

    describe("PUT /api/posts/:id", () => {
        

        it("should update a post when authorized", async () => {
            const updatedPost = {
                title: "Updated Test Post",
                content: "Updated content",
            };

            const res = await request(app)
                .put(`/api/posts/${post._id}`)
                .set("Authorization", `Bearer ${tokenEditor}`)
                .send(updatedPost);

            expect(res.statusCode).toBe(200);
            expect(res.body.title).toBe(updatedPost.title);
        });

        it("should return 403 if unauthorized", async () => {
            const res = await request(app)
                .put(`/api/posts/${post._id}`)
                .send({ title: "Unauthorized Update" });

            expect(res.statusCode).toBe(403);
        });
    });

    describe("DELETE /api/posts/:id", () => {
        it("should delete a post when authorized", async () => {
            const postToDelete = await PostModel.create({
                title: "Post to delete",
                content: "Content",
                author: new mongoose.Types.ObjectId(),
            });

            const res = await request(app)
                .delete(`/api/posts/${postToDelete._id}`)
                .set("Authorization", `Bearer ${tokenAdmin}`);

            expect(res.statusCode).toBe(204);
        });

        it("should return 403 if unauthorized", async () => {
            const res = await request(app).delete(`/api/posts/${post._id}`);

            expect(res.statusCode).toBe(403);
        });
    });

    describe("GET /api/posts/list", () => {
        it("should return a list of posts", async () => {
            const res = await request(app).get("/api/posts/list");

            expect(res.statusCode).toBe(200);
            expect(res.body.users.length).toBeGreaterThan(0);
        });
    });

    describe("GET /api/posts/:id", () => {
        it("should return a post by ID", async () => {
            const res = await request(app)
                .get(`/api/posts/${post._id}`)
                .set("Authorization", `Bearer ${tokenEditor}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("title", "Test Post");
        });

        it("should return 404 if post is not found", async () => {
            const res = await request(app)
                .get(`/api/posts/${new mongoose.Types.ObjectId()}`)
                .set("Authorization", `Bearer ${tokenEditor}`);

            expect(res.statusCode).toBe(404);
        });

        it("should return 403 if unauthorized", async () => {
            const res = await request(app).get(`/api/posts/${post._id}`);

            expect(res.statusCode).toBe(403);
        });
    });
});

import mongoose, { Types } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { PostService } from "../../services/post.service";
import { IPost } from "../../models/post.interface";
import PostModel from "../../models/post.model";

describe('PostService', () => {
    let postService: PostService;
    let mongoServer: MongoMemoryServer;
    let postId: string;

    beforeAll(async () => {
        postService = new PostService();
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Post CRUD operations', () => {
        const posts = [{
            _id: new Types.ObjectId(),
            title: "Test 1",
            content: "This is a test post",
            publishedAt: new Date(),
            author: new Types.ObjectId().toString()
        },{
            _id: new Types.ObjectId(),
            title: "Test 2",
            content: "This is a test post",
            publishedAt: new Date(),
            author: new Types.ObjectId().toString()
        },{
            _id: new Types.ObjectId(),
            title: "Test 3",
            content: "This is a test post",
            publishedAt: new Date(),
            author: new Types.ObjectId().toString()
            }]
        
        beforeAll(async() => {
            await PostModel.create(posts)
        })

        it('creates a post', async () => {
            const newPost: IPost = {
                title: "Test Post",
                content: "This is a test post",
                publishedAt: new Date(),
                author: new mongoose.Types.ObjectId().toString()
            };
            const createdPost = await postService.create(newPost);
            expect(createdPost).toHaveProperty('_id');
            expect(createdPost.title).toBe(newPost.title);
        });
    
        it('lists all posts', async () => {
            const posts = await postService.listAll();
            expect(posts.length).toBeGreaterThan(1);
        });
    
        it('finds a post by ID', async () => {
            const foundPost = await postService.findById(posts[0]._id.toString());
            expect(foundPost).not.toBeNull();
            expect(foundPost?.title).toBe(posts[0].title);
        });
    
        it('updates a post', async () => {
            const updatedPost = await postService.update(posts[0]._id.toString(), {
                title: "Updated Post",
                content: "Updated content",
                publishedAt: new Date(),
                author: new mongoose.Types.ObjectId().toString()
            });
            expect(updatedPost.title).toBe("Updated Post");
        });
    
        it('throws an error if updating a non-existing post', async () => {
            await expect(postService.update(new mongoose.Types.ObjectId().toString(), {
                title: "Non-existent",
                content: "No content",
                publishedAt: new Date(),
                author: new mongoose.Types.ObjectId().toString()
            })).rejects.toThrow('Post not found');
        });
    
        it('deletes a post', async () => {
            await postService.delete(posts[0]._id.toString());
            const deletedPost = await postService.findById(posts[0]._id.toString());
            expect(deletedPost).toBeNull();
        });
    })
    
});

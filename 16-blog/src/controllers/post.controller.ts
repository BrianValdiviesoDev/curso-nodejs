import { NotFoundError } from "../errors/errorFactory";
import { IPost } from "../models/post.interface";
import { IUser } from "../models/user.interface";
import { PostService } from "../services/post.service";

export class PostController {
    postService: PostService;
    constructor(postService: PostService) {
        this.postService = postService
    }

    async create(post: IPost, authorId:string):Promise<IPost> {
        post.author = authorId
        return await this.postService.create(post)
    }

    async listAll(): Promise<IPost[]> {
        return await this.postService.listAll()
    }

    async findById(id:string): Promise<IPost>{
        const post = await this.postService.findById(id)
        if (!post) throw new NotFoundError('Post not found')
        return post
    }

    async update(id: string, post: IPost): Promise<IPost> {
        return await this.postService.update(id, post)
    }

    async delete(id: string):Promise<void> {
        return await this.postService.delete(id)
    }
}
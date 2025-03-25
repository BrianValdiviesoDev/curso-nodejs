import { NotFoundError } from "../errors/errorFactory"
import { IPost } from "../models/post.interface"
import PostModel from "../models/post.model"


export class PostService {
    async create(post: IPost): Promise<IPost>{
        return await PostModel.create(post)
    }

    async listAll(): Promise<IPost[]>{
        return await PostModel.find()
    }
    
    async findById(id: string): Promise<IPost | null>{
        return await PostModel.findById(id)
    }

    async update(id: string, post: IPost): Promise<IPost>{
        const updated = await PostModel.findByIdAndUpdate(id, post, { new: true })
        if (!updated) {
            throw new NotFoundError("Post not found")
        }
        return updated
    }

    async delete(id: string): Promise<void>{
        await PostModel.deleteOne({_id:id})
    }
}
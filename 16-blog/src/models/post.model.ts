import { Document, model, Model, Schema } from "mongoose";
import { IPost } from "./post.interface";

interface PostDocument extends IPost, Document { }

const PostSchema = new Schema<PostDocument>(
    {
        title: { type: String, required:true },
        content: { type: String },
        publishedAt: { type: Date },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true }
    }, {
        versionKey: false,
        timestamps: true
    }
)

const PostModel: Model<PostDocument & Document> = model('Post', PostSchema)
export default PostModel
import { Document, model, Model, Schema } from "mongoose";
import { IUser } from "./user.interface";

interface UserDocument extends IUser, Document { }

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        rol: { type:String, required:true}
    }, {
        versionKey: false,
        timestamps: true
    }
)

const UserModel: Model<UserDocument & Document> = model('User', UserSchema)
export default UserModel
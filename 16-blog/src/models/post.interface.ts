import { IUser } from "./user.interface";

export interface IPost{
    title: string,
    content: string,
    publishedAt: Date;
    author: string | IUser
}
export enum Role{
    ADMIN = "Admin",
    GUEST = "Guest"
}
export interface IUser{
    name: string,
    email: string,
    password: string,
    role: Role
}
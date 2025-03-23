export enum Rol {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    VISITANTE = 'VISITANTE'
}
export interface IUser{
    name: string,
    email: string,
    password: string;
    rol:Rol
}
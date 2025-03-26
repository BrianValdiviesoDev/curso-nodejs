/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "securepassword123"
 *         rol:
 *           type: string
 *           enum: [ADMIN, EDITOR, VISITANTE]
 *           example: "EDITOR"
 */

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
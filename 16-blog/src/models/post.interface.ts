import { IUser } from "./user.interface";
/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Mi primer post"
 *         content:
 *           type: string
 *           example: "Este es el contenido de mi post"
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-25T12:00:00Z"
 *         author:
 *           oneOf:
 *             - type: string
 *               example: "651f3cdd8f9b4a2c3e4f1a9b"
 *             - $ref: "#/components/schemas/User"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export interface IPost{
    title: string,
    content: string,
    publishedAt: Date;
    author: string | IUser
}
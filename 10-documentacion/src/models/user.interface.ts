/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre completo del usuario
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *          example:
 *              name: "testing swagger"
 *              email: "test@swagger.com"
 */
export interface IUser{
    name: string,
    email: string,
}
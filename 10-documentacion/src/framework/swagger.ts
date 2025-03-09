import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import { Express } from "express";
const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API del Curso de Node",
            version: "1.0.0",
            description: "Documentación de la API usando Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ]
    },
    apis: [
        "./src/framework/routes/*.ts",
        "./src/models/*.ts"
    ]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
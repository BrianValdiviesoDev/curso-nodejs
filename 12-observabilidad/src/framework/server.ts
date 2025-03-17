import express, {Express} from "express";
import { ErrorHandler } from "./middlewares/errorHandler";
import sampleRouter from "./routes/sample.routes"
import { logger } from "./winston";
import client from 'prom-client'

const app = async (): Promise<Express> => {
    logger.info("Arrancando el servidor")
    const app = express()
    app.use(express.json())

    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics()

    app.get('/health', (req, res) => {
        const healthCheck = {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        }
        res.status(200).send(healthCheck)
    })

    app.get('/metrics', async (req, res) => {
        res.set('Content-type', client.register.contentType)
        res.end(await client.register.metrics())
    })

    app.use('/api/sample', sampleRouter)

    app.use(ErrorHandler.handle)

    logger.error("Error con Express")
    return app

}
export default app;
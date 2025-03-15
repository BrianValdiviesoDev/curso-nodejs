import express, {Express} from "express";
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import sampleRouter from "./routes/sample.routes"

const app = async (): Promise<Express> => {
    const app = express()
    app.use(express.json())

    app.use('/api/sample', sampleRouter)

    app.use(ErrorHandler.handle)
    app.use(logger)
    return app

}
export default app;
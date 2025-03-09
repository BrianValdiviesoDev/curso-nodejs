import express, {Express} from "express";
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { MongoService } from "./mongodb";
import userRouter from "./routes/user.routes"

const app = async (mongo_uri: string): Promise<Express> => {
    const mongo = new MongoService(mongo_uri)
    await mongo.connect()

    const app = express()
    app.use(express.json())

    app.use('/api/users', userRouter)

    app.use(ErrorHandler.handle)
    app.use(logger)
    return app

}
export default app;
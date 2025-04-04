import express from "express";
import sampleRouter from "./routes/sample.routes"
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { MongoService } from "./mongodb";
import userRouter from "./routes/user.routes"
import path from "path";
import userViewsRouter from "./routes/user-views.routes"

const mongo_uri = process.env.MONGO_URI
if (!mongo_uri) {
    throw new Error("MONGO_URI is not defined")
}
const mongo = new MongoService(mongo_uri)
mongo.connect()

const app = express()
app.use(express.json())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../views'))

app.use('/api/sample', sampleRouter)
app.use('/api/users', userRouter)
app.use('/users', userViewsRouter)

app.use(ErrorHandler.handle)
app.use(logger)

export default app;
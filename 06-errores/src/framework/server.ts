import express from "express";
import userRouter from "./routes/user.routes"
import { logger } from "./middlewares/logger";
import { ErrorHandler } from "./middlewares/errorHandler";

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)

app.use(ErrorHandler.handle)

app.use(logger)

export default app;
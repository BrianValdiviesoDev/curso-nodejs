import express from "express";
import sampleRouter from "./routes/sample.routes"
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";

const app = express()
app.use(express.json())

app.use('/api/sample', sampleRouter)

app.use(ErrorHandler.handle)
app.use(logger)

export default app;
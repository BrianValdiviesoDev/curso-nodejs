import express from "express";
import sampleRouter from "./routes/sample.routes"
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import cors from "cors"

const app = express()
app.use(express.json())

const corsOptions = {
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    origin: ["https://curso-node.com", "https://app.curso-node.com"]
}
app.use(cors(corsOptions))

app.use('/api/sample', sampleRouter)

app.use(ErrorHandler.handle)
app.use(logger)

export default app;
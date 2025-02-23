import express from "express";
import sampleRouter from "./routes/sample.routes"
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { Postgres } from "./db.postgres";
import userRouter from "./routes/user.routes";

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_DATABASE;

if (!db_host || !db_user || !db_password || !db_database) {
    throw new Error("Some env variables not found")
}

const db = new Postgres(db_host, db_user, db_password, db_database)
db.connect()

const app = express()
app.use(express.json())

app.use('/api/sample', sampleRouter)
app.use('/api/users', userRouter)

app.use(ErrorHandler.handle)
app.use(logger)

export default app;
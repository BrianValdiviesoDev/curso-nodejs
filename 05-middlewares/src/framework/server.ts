import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.routes"
import { auth, checkRole } from "./middlewares/auth";
import { logger } from "./middlewares/logger";

const app = express()
app.use(express.json())


app.get('/health', (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send("Healthy")
    next()
})

app.post('/health', auth, (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send("Healthy")
    next()
})

app.get('/invoices', [checkRole, auth], (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Your data")
    next()
})

app.use('/api/users', auth, userRouter)

app.use(logger)

export default app;
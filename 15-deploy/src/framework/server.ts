try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found", e)
}


import express, { Express, NextFunction, Request, Response } from "express";
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import sampleRouter from "./routes/sample.routes"
import { IConfig } from "../config/config.interface";
import { Config as ConfigPro } from "../config/config.pro";
import { Config as ConfigDev } from "../config/config.dev";



let config: IConfig;
const environment = process.env.NODE_ENV || 'dev'

if (environment === 'pro') {
    config = new ConfigPro()
} else {
    config = new ConfigDev()
}

const app = express()
app.use(express.json())

app.use('/api/sample', sampleRouter)

app.get('/health', (req: Request, res: Response, next: NextFunction) => {
    const healtchCheck = {
        status: 'ok',
        env: environment,
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
        retryLogin: config.retryLogin
    } 
    res.status(200).send(healtchCheck)
})

app.use(ErrorHandler.handle)
app.use(logger)

export default app;
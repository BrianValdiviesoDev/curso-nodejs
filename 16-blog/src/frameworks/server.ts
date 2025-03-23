import express, { Express } from 'express'
import { ErrorHandler } from './middlewares/errorHandler'
import { IConfig } from '../config/config.interface'
import { Config as ConfigPro } from '../config/config.pro'
import { Config as ConfigDev } from '../config/config.dev'
import { MongoService } from './mongo'
const app = async (): Promise<Express> => {
    const environment = process.env.NODE_ENV || 'dev'
    let config: IConfig;
    if (environment == 'pro') {
        config = new ConfigPro()
    } else {
        config = new ConfigDev()
    }
    const mongo = new MongoService(config.mongoUri)
    await mongo.connect()
    const app = express()
    app.use(express.json())

    app.use(ErrorHandler.handle)
    return app
}
export default app;
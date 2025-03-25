import express, { Express } from 'express'
import { ErrorHandler } from './middlewares/errorHandler'
import { IConfig } from '../config/config.interface'
import { Config as ConfigPro } from '../config/config.pro'
import { Config as ConfigDev } from '../config/config.dev'
import { MongoService } from './mongo'
import { UserRouter } from './routes/user.routes'
import { PostRouter } from './routes/post.routes'

try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found")
}


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

    const userRouter = UserRouter(config)
    const postRouter = PostRouter(config)

    const app = express()
    app.use(express.json())

    app.use('/api/users', userRouter)
    app.use('/api/posts', postRouter)


    app.use(ErrorHandler.handle)
    return app
}
export default app;
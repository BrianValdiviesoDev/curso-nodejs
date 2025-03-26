import express, { Express } from 'express'
import { IConfig } from './config/config.interface';
import { Config as ConfigPro } from './config/config.pro'
import { Config as ConfigDev } from './config/config.dev'
import { MongoService } from './frameworks/mongo';
import { UserRouter } from './frameworks/routes/user.routes';
import { PostRouter } from './frameworks/routes/post.routes';
import { setupSwagger } from './frameworks/swagger';
import { ErrorHandler } from './frameworks/middlewares/errorHandler';


try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found")
}


const environment = process.env.NODE_ENV || 'dev'
let config: IConfig;
if (environment == 'pro') {
    config = new ConfigPro()
} else {
    config = new ConfigDev()
}
const mongo = new MongoService(config.mongoUri)
mongo.connect()

const userRouter = UserRouter(config)
const postRouter = PostRouter(config)

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

setupSwagger(app)
app.use(ErrorHandler.handle)

export default app;
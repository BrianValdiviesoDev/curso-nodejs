import mongoose from "mongoose";
import { logger } from "./middlewares/logger";

export class MongoService{
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;    
    }

    connect() {
        mongoose.set('debug', true)
        mongoose.connect(this.uri)
            .then(() => {
                logger.info('MongoDB connected!')
            }, (error) => {
                logger.error("Error connecting Mongo:", error)
            })
            .catch((error) => {
                logger.error("Error connecting Mongo:", error)
            })
        
        mongoose.connection.on('error', (error) => {
            mongoose.disconnect()
            logger.error("Error in MongoDB", error)
        })
    }
}
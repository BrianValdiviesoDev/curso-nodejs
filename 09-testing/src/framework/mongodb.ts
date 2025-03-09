import mongoose from "mongoose";

export class MongoService{
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;    
    }

    connect() {
        mongoose.set('debug', true)
        mongoose.connect(this.uri)
            .then(() => {
                console.log('MongoDB connected!')
            }, (error) => {
                console.error("Error connecting Mongo:", error)
            })
            .catch((error) => {
                console.error("Error connecting Mongo:", error)
            })
        
        mongoose.connection.on('error', (error) => {
            mongoose.disconnect()
            console.error("Error in MongoDB", error)
        })
    }
}
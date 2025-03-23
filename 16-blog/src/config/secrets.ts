export class Secrets{
    mongoUri: string;
    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set as environment variable")
        }
        this.mongoUri = process.env.MONGO_URI
    }
}
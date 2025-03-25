export class Secrets{
    mongoUri: string;
    jwtSecret: string;
    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not set as environment variable")
        }
        this.mongoUri = process.env.MONGO_URI

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not set as environment variable")
        }
        this.jwtSecret = process.env.JWT_SECRET
    }
}
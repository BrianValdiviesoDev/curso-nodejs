import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";

export class Postgres {
    sequelize: Sequelize;

    constructor(
        host: string,
        username: string,
        password: string,
        database: string,
    ) {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host,
            username,
            password,
            database,
            models: [User],
            logging: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized:false
                }
            }
        })
    }


    async connect() {
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync({alter:true})
        } catch (e) {
            console.error("Error conectando con la base de datos: ",e)
        }
    }
}
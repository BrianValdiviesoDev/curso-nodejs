import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";
import { IUser } from "./user.interface";

@Table({tableName: 'users'})
export class User extends Model<IUser>{

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    updatedAt?: Date;
}
import { Model, Column, PrimaryKey, AutoIncrement, Table, Unique, HasMany } from "sequelize-typescript";
import { UserDto } from "./user.dto";
import { Product } from "src/modules/product/model/product.model";


export interface UserEntity {
    id: number;
    username: string;
    age: number;
    email: string;
    password: string;
}

@Table
export class User extends Model<UserEntity, UserDto> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public username: string;

    @Unique
    @Column
    public email: string;

    @Column
    public password: string;

    @Column
    public age: number;
 
    @HasMany(() => Product)
    products: Product[]
}
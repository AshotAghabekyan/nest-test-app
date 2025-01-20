import { Model, Column, PrimaryKey, AutoIncrement, Table, Unique, HasMany } from "sequelize-typescript";
import { Product } from "src/modules/product/model/product.model";
import { IUserDto, UserEntity } from "../interfaces/user.interfaces";




@Table
export class User extends Model<UserEntity, IUserDto> {

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
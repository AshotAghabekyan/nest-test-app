import { Model, Table, PrimaryKey, ForeignKey, Column, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { User } from "src/modules/user/model/user.model";
import { Category } from "./product.dto";


interface ProductCreationAttr {
    title: string;
    category: Category,
    price: number,
    ownerId: number,
}


export class ProductEntity {
    productId: number;
    ownerId: number;
    title: string;
    price: number;
    category: Category;
}



@Table
export class Product extends Model<ProductEntity, ProductCreationAttr> {

    @PrimaryKey
    @AutoIncrement
    @Column
    productId: number;

    @ForeignKey(() => User)
    ownerId: number

    @BelongsTo(() => User, "ownerId")
    owner: User;

    @Column 
    title: string

    @Column
    category: Category

    @Column
    price: number
}
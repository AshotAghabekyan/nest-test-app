import { Category } from "../model/product.dto";
import { IPatchProductDto, IProductDto, ProductEntity } from "../interfaces/product.interfaces";


export interface IProductRepository {
    findById(productId: number): Promise<ProductEntity>;
    findProductsByOwner(ownerId: number): Promise<ProductEntity[]>;
    findAll(): Promise<ProductEntity[]>;
    filterByCategory(category: Category): Promise<ProductEntity[]>;
    create(productDto: IProductDto, ownerId: number): Promise<ProductEntity>;
    delete(productId: number): Promise<boolean>;
    update(productId: number, productPatchDto: IPatchProductDto): Promise<ProductEntity>;
}


export const PRODUCT_REPOSITORY_TOKEN = Symbol('PRODUCT_REPOSITORY_TOKEN');
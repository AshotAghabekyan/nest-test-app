import { Category, ProductDto, ProductPatchDto } from "../model/product.dto";
import { ProductEntity } from "../model/product.model";


export interface IProductRepository {
    findById(productId: number): Promise<ProductEntity>;
    findProductsByOwner(ownerId: number): Promise<ProductEntity[]>;
    findAll(): Promise<ProductEntity[]>;
    filterByCategory(category: Category): Promise<ProductEntity[]>;
    create(productDto: ProductDto, ownerId: number): Promise<ProductEntity>;
    delete(productId: number): Promise<boolean>;
    update(productId: number, productPatchDto: ProductPatchDto): Promise<ProductEntity>;
}


export const PRODUCT_REPOSITORY_TOKEN = Symbol('PRODUCT_REPOSITORY_TOKEN');
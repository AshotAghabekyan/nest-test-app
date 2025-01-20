import { InjectModel } from "@nestjs/sequelize";
import { Product } from "../model/product.model";
import { IProductRepository } from "./product.repository";
import { Category } from "../model/product.dto";
import { ProductRepositoryException } from "./product.repositoryException";
import { IPatchProductDto, IProductDto, ProductEntity } from "../interfaces/product.interfaces";


export class PostgreProductRepository implements IProductRepository {
    private readonly productModel: typeof Product;

    constructor(@InjectModel(Product) productModel: typeof Product) {
        this.productModel = productModel;
    }


    public async create(productDto: IProductDto, ownerId: number): Promise<ProductEntity> {
        try {
            const createdProduct: ProductEntity = await this.productModel.create({...productDto, ownerId});
            return createdProduct;

        }
        catch {
            throw new ProductRepositoryException(`Cannot create product`)
        }
    }

    public async delete(productId: number): Promise<boolean> {
        try {
            const deletedRowCount: number = await this.productModel.destroy({where: {productId}});
            return Boolean(deletedRowCount);
        }        
        catch {
            throw new ProductRepositoryException(`Cannot delete product ${productId}`)
        }
    }


    public async update(productId: number, productPatchDto: IPatchProductDto) {
        try {
            const [updatedRows] = await this.productModel.update(productPatchDto, {
                where: {
                    productId
                }
            })
    
            if (updatedRows == 0) {
                return null;
            }

            const updatedProduct: ProductEntity = await this.productModel.findByPk(productId);
            return updatedProduct;
        }
        catch(error) {
            console.error(error);
            throw new ProductRepositoryException(`Error updating ${JSON.stringify(productPatchDto)} for product ID ${productId}: ${error.message}`);
        }
    }


    public async findAll(): Promise<ProductEntity[]> {
        try {
            const allProducts: ProductEntity[] = await this.productModel.findAll();
            return allProducts || [];
        }
        catch(error) {
            console.error(error);
            throw new ProductRepositoryException('Cannot find products')
        }
    }

    public async findById(productId: number): Promise<ProductEntity> {
        try {
            const targetProduct: ProductEntity = await this.productModel.findByPk(productId);
            return targetProduct;
        }
        catch(error) {
            console.error(error);
            throw new ProductRepositoryException(`Cannot find product by ID: ${productId}`)
        }
    }

    public async findProductsByOwner(ownerId: number): Promise<ProductEntity[]> {
        try {
            const concreteUserProducts: ProductEntity[] = await this.productModel.findAll({
                where: {ownerId}
            }) 
            return concreteUserProducts || [];
        }
        catch(error) {
            console.error(error);
            throw new ProductRepositoryException(`Cannot find product by ownerId: ${ownerId}`);
        }
    }

    public async filterByCategory(category: Category): Promise<ProductEntity[]> {
        try {
            const concreteCategoryProducts: ProductEntity[] = await this.productModel.findAll({
                where: {category}
            })
            return concreteCategoryProducts || [];
        }
        catch(error) {
            console.error(error);
            throw new ProductRepositoryException(`Cannot find products by category ${category}`)
        }
    }
}




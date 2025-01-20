import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category, ProductDto, ProductPatchDto } from "./model/product.dto";
import { IProductRepository, PRODUCT_REPOSITORY_TOKEN } from "./repository/product.repository";
import { ProductEntity } from "./model/product.model";



export class ProductPermissionService {
    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async ensureProductOwner(productId: number, requestingUserId: number) {
        const product: ProductEntity = await this.productRepository.findById(productId);    
        const isOwnerVerified: boolean = product.ownerId == requestingUserId;
        return isOwnerVerified;
    }
}



@Injectable()
export class ProductService {
    private readonly productRepository: IProductRepository;
    private readonly permissionController: ProductPermissionService;

    constructor(@Inject(PRODUCT_REPOSITORY_TOKEN) productRepository: IProductRepository) {
        this.productRepository = productRepository;
        this.permissionController = new ProductPermissionService(productRepository);
    }


    public async create(productDto: ProductDto, ownerId: number) {
        const createdProduct: ProductEntity = await this.productRepository.create(productDto, ownerId);
        if (!createdProduct) {
            throw new BadRequestException('The product was not created');
        }
        return createdProduct;
    }


    public async delete(productId: number, requestingUserId: number) {
        const product: ProductEntity = await this.findById(productId);

        if (!product) {
            throw new NotFoundException("The product does not exist");
        }

        const reqUserIsProductOwner: boolean = await this.permissionController.ensureProductOwner(productId, requestingUserId)
        if (!reqUserIsProductOwner) {
            throw new ForbiddenException("Permission Denied! You can delete only your own products");
        }

        return this.productRepository.delete(productId);
    }

    
    public async update(productId: number, requestingUserId: number, productPatchDto: ProductPatchDto) {
        const isProductExist: ProductEntity = await this.findById(productId);
        if (!isProductExist) {
            throw new NotFoundException('The product does not exist');
        }

        const reqUserIsProductOwner: boolean = await this.permissionController.ensureProductOwner(productId, requestingUserId)
        if (! reqUserIsProductOwner) {
            throw new ForbiddenException("Permission Denied! You can update only your own products");
        }

        const updatedProduct: ProductEntity = await this.productRepository.update(productId, productPatchDto);
        return updatedProduct;
    }


    public async findById(productId: number) {
        const targetProduct: ProductEntity = await this.productRepository.findById(productId);
        if (!targetProduct) {
            throw new NotFoundException(`Product with ID ${productId} does not found`)
        }

        return targetProduct;
    }

    public async findAll() {
        const allProducts: ProductEntity[] = await this.productRepository.findAll();
        return allProducts;
    }


    public async findByOwner(ownerId: number) {
        const concreteUserProducts: ProductEntity[] = await this.productRepository.findProductsByOwner(ownerId);
        if (!concreteUserProducts) {
            throw new NotFoundException('Cannot find products of the wanted user');
        }
        return concreteUserProducts;
    }


    public async findByCategory(category: Category) {
        const concreteCategoryProducts: ProductEntity[] = await this.productRepository.filterByCategory(category);
        if (!concreteCategoryProducts) {
            throw new NotFoundException('Cannot find concrete category products');
        }
        return concreteCategoryProducts;
    }
}
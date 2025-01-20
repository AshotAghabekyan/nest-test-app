import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./model/product.model";
import { PRODUCT_REPOSITORY_TOKEN } from "./repository/product.repository";
import { PostgreProductRepository } from "./repository/product.postgreRepository";

@Module({
    imports: [JwtModule, SequelizeModule.forFeature([Product])],
    providers: [
        ProductService,
        {
            provide: PRODUCT_REPOSITORY_TOKEN,
            useClass: PostgreProductRepository,
        }
    ],
    controllers: [ProductController],
})
export class ProductModule {};
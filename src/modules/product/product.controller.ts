import { Controller, Get, Patch, Post, Delete, Param, ParseIntPipe, Body, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Category, ProductDto, ProductPatchDto, ProductResponseDto } from "./model/product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";



@ApiTags('Products')
@Controller("/products")
export class ProductController {
    private readonly productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    @Get('/')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [ ProductResponseDto] })  // Указываем тип в массиве
    public async findAll() {
        return await this.productService.findAll();
    }


    @Get('/:id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    @ApiResponse({ type: ProductResponseDto })
    public async findById(@Param('id', ParseIntPipe) productId: number) {
        return await this.productService.findById(productId);
    }


    @Get("/category/:category")
    @ApiOperation({ summary: 'Get products by category' })
    @ApiParam({ name: 'category', type: 'string', description: 'Product category' })
    @ApiResponse({ type: [ProductResponseDto] })  
    public async findByCategory(@Param("category") productCategory: Category) {
        return await this.productService.findByCategory(productCategory);
    }


    @Get("/user/:userId")
    @ApiOperation({ summary: 'Get products by owner' })
    @ApiParam({ name: 'userId', type: 'number', description: 'User ID (Owner)' })
    @ApiResponse({  type: [ProductResponseDto] })
    public async findByOwner(@Param('userId', ParseIntPipe) ownerId: number) {
        return await this.productService.findByOwner(ownerId);
    }


    @UseGuards(AuthGuard)
    @Post("/")
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: ProductDto })
    @ApiResponse({ type: ProductResponseDto })
    public async create(@Body() productDto: ProductDto, @Req() req: Request) {
        const ownerId: number = +req['user'].id;
        return await this.productService.create(productDto, ownerId);
    }


    @UseGuards(AuthGuard)
    @Delete("/:id")
    @ApiOperation({ summary: 'Delete a product' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product successfully deleted',"type": Boolean })
    public async delete(@Param("id", ParseIntPipe) productId: number, @Req() req: Request) {
        const requestingUserId: number = +req['user'].id;
        return await this.productService.delete(productId, requestingUserId);
    }


    @UseGuards(AuthGuard)
    @Patch("/:id")
    @ApiOperation({ summary: 'Update a product' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    @ApiBody({ type: ProductPatchDto })
    @ApiResponse({ status: 200, description: 'Product successfully updated', type: ProductResponseDto })
    public async update(@Param("id", ParseIntPipe) productId: number, @Body() patchDto: ProductPatchDto, @Req() req: Request) {
        const requestingUserId: number = +req['user'].id;
        return await this.productService.update(productId, requestingUserId, patchDto);
    }
}

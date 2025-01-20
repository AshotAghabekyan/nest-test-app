import { ApiProperty } from "@nestjs/swagger";
import { IPatchProductDto, IProductDto, IProductResponseDto } from "../interfaces/product.interfaces";
import { Category } from "../model/product.dto";



export class SwaggerProductDto implements IProductDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    category: Category;

    @ApiProperty({
    "minimum": 0,
    })
    price: number;
}



export class SwaggerPatchProductDto implements IPatchProductDto {
    @ApiProperty({required: false})
    title?: string

    @ApiProperty({required: false})
    price?: number;

    @ApiProperty({required: false})
    category?: Category;
}



export class SwaggerProductResponseDto implements IProductResponseDto{
    @ApiProperty({"type": "number"})
    productId: number;

    @ApiProperty({"type": "number"})
    ownerId: number;

    @ApiProperty({"type": "string"})
    title: string;

    @ApiProperty({"type": "number"})
    price: number;

    @ApiProperty({"type": "string"})
    category: Category;
  }
  
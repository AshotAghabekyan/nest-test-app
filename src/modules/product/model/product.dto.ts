import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';



export type Category = "Food" | "Shoes" | "Accessories"



export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['Food', 'Shoes', 'Accessories'])
  category: Category;

  @ApiProperty({
    "minimum": 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}




export class ProductPatchDto {
    @ApiProperty({"required": false})
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({"required": false})
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({"required": false})
    @IsOptional()
    @IsEnum(['Food', 'Shoes', 'Accessories'])
    category?: Category;
  }




  export class ProductResponseDto {
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
  

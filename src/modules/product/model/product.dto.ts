import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { IPatchProductDto, IProductDto } from '../interfaces/product.interfaces';



export type Category = "Food" | "Shoes" | "Accessories"



export class ProductDto implements IProductDto{
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(['Food', 'Shoes', 'Accessories'])
  category: Category;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}




export class ProductPatchDto implements IPatchProductDto{
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsEnum(['Food', 'Shoes', 'Accessories'])
    category?: Category;
  }






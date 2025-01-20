import { Category } from "../model/product.dto";



export interface IProductDto {
    title: string;
    price: number;
    category: Category
}



export interface IPatchProductDto {
    title?: string;
    price?: number;
    category?: Category;
}


export interface IProductResponseDto {
    productId: number;
    ownerId: number;
    price: number;
    title: string;
    category: Category;
}



export interface ProductCreationAttr {
    title: string;
    category: Category,
    price: number,
    ownerId: number,
}


export interface ProductEntity {
    productId: number;
    ownerId: number;
    title: string;
    price: number;
    category: Category;
}

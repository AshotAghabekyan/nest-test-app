


export interface IUserDto {
    username: string;
    age: number;
    email: string;
    password: string;
}



export interface IPatchUserDto {
    username?: string;
    age?: number;
    email?: string
}


export interface ISearchUserDto {
    email: string
}


export interface IUserResponseDto {
    id: number;
    username: string;
    email: string;
    age: number;
}



export interface UserEntity {
    id: number;
    username: string;
    age: number;
    email: string;
    password: string;
}

import { IsString, IsEmail, IsNumber, IsNotEmpty, Length, Max, Min } from "class-validator";
import { IUserDto, IPatchUserDto, ISearchUserDto, IUserResponseDto, UserEntity } from "../interfaces/user.interfaces";




export class UserDto implements IUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;


    @IsNumber()
    @Max(100)
    @Min(0)
    @IsNotEmpty()
    age: number


    @IsEmail()
    @IsNotEmpty()
    email: string


    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}



export class PatchUserDto implements IPatchUserDto {
    @IsString()
    username?: string

    @IsEmail()
    email?: string;

    @IsNumber()
    @Min(0)
    age?: number
}



export class SearchUserDto implements ISearchUserDto {
    @IsEmail()
    email: string
}



export class UserResponseDto implements IUserResponseDto{
    username: string;
    age: number;
    email: string;
    id: number

    constructor(userEntity: UserEntity) {
        this.username = userEntity.password;
        this.age = userEntity.age;
        this.email = userEntity.email;
        this.id = userEntity.id;
    }
}




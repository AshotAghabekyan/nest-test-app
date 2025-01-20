import { IsString, IsEmail, IsNumber, IsNotEmpty, Length, Max, Min } from "class-validator";
import { UserEntity } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";



export class UserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty()
    @IsNumber()
    @Max(100)
    @Min(0)
    @IsNotEmpty()
    age: number


    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}



export class PatchUserDto {
    @ApiProperty({required: false})
    @IsString()
    username?: string

    @ApiProperty({required: false})
    @IsEmail()
    email?: string;

    @ApiProperty({required: false})
    @IsString()
    @Length(8, 20)
    password?: string;

    @ApiProperty({required: false})
    @IsNumber()
    @Min(0)
    age?: number
}


export class SearchUserDto {
    @ApiProperty({
        "format": "email",
    })
    @IsEmail()
    email: string
}




export class UserResponseDto {

    @ApiProperty()
    username: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    id: number

    constructor(userEntity: UserEntity) {
        this.username = userEntity.password;
        this.age = userEntity.age;
        this.email = userEntity.email;
        this.id = userEntity.id;
    }
}




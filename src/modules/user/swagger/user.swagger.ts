import { IPatchUserDto, ISearchUserDto, IUserDto, IUserResponseDto } from "../interfaces/user.interfaces";
import { ApiProperty } from "@nestjs/swagger";



export class SwaggerUserDto implements IUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    age: number

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string;
}


export class SwaggerPatchUserDto implements IPatchUserDto {
    @ApiProperty({required: false})
    username?: string;

    @ApiProperty({required: false})
    age?: number;

    @ApiProperty({required: false})
    email?: string;
}



export class SwaggerSearchUserDto implements ISearchUserDto {
    @ApiProperty({
        "format": "email",
    })
    email: string;
}



export class SwaggerUserResponseDto implements IUserResponseDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    id: number
}
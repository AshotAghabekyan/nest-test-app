import { ApiProperty } from "@nestjs/swagger";



export interface AuthCredentials {
    email: string;
    password: string;
}


export interface JwtPayload {
    id: number,
    email: string,
}


export interface JwtToken {
    accessToken: string,
    refreshToken: string
}



export class SwaggerRefreshToken {
    @ApiProperty()
    refreshToken: string;
}


export class SwaggerAuthCredentials implements AuthCredentials {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class SwaggerJwtToken implements JwtToken {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}
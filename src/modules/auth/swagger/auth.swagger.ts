import { AuthCredentials, JwtToken } from "../interface/auth.interface";
import { ApiProperty } from "@nestjs/swagger";


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


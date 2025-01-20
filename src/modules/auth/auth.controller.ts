import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentials, JwtToken} from './interface/auth.interface';
import { SwaggerAuthCredentials, SwaggerJwtToken, SwaggerRefreshToken } from './swagger/auth.swagger';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';



@ApiTags('Authentication') 
@Controller('/auth')
export class AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Post('/')
    @ApiOperation({ summary: 'Authenticate user and generate JWT tokens' })
    @ApiBody({ description: 'User login credentials', type: SwaggerAuthCredentials })
    @ApiResponse({ status: 200, description: 'Successfully authenticated', type: SwaggerJwtToken })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    public async authenticate(@Body() credentials: AuthCredentials): Promise<JwtToken> {
        return await this.authService.signIn(credentials);
    }

    @Post('/refresh')
    @ApiOperation({ summary: 'Refresh JWT tokens using a refresh token' })
    @ApiBody({ description: 'Refresh token',  type: SwaggerRefreshToken })
    @ApiResponse({ status: 200, description: 'Tokens successfully refreshed', type: SwaggerJwtToken })
    @ApiResponse({ status: 400, description: 'Invalid refresh token' })
    public async refreshAuthenticate(@Body('refreshToken') refreshToken: string) {
        return this.authService.updateAuth(refreshToken);
    }
}







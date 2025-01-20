import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

  
@Injectable()
export class AuthGuard implements CanActivate {
    private readonly jwtService: JwtService;
    private readonly jwtSecretKey: string;

    constructor(jwtService: JwtService, configService: ConfigService) {
        this.jwtService = jwtService;
        this.jwtSecretKey = configService.get('jwt').accessTokenKey;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {"secret": this.jwtSecretKey});
            request['user'] = payload;
        } 
        catch {
            throw new UnauthorizedException();
        }
        return true;
    }


    private extractTokenFromHeader(request: Request): string {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}

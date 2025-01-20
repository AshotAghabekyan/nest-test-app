import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentials, JwtPayload, JwtToken } from "./interface/auth.interface";
import { UserService } from "../user/user.service";
import { CryptoProvider } from "../crypto/crypto.provider";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../user/interfaces/user.interfaces";



@Injectable()
export class JwtTokenProvider {
    private readonly jwtService: JwtService;
    private readonly accessTokenKey: string;
    private readonly refreshTokenKey: string;

    constructor(jwtService: JwtService, configService: ConfigService) {
        this.jwtService = jwtService;
        this.accessTokenKey = configService.get('jwt').accessTokenKey;
        this.refreshTokenKey = configService.get('jwt').refreshTokenKey;
        console.log(this.accessTokenKey);
    }


    async generateTokens(payload: JwtPayload) {
        const accessTokenPromise: Promise<string> = this.jwtService.signAsync(payload, {
            secret: this.accessTokenKey,
            expiresIn: "1h"
        });

        const refreshTokenPromise: Promise<string> = this.jwtService.signAsync(payload, {
            secret: this.refreshTokenKey,
            expiresIn: '7d',
        })


        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);
        const tokens: JwtToken = {
            accessToken, 
            refreshToken,
        }

        return tokens;
    }


    async validateRefreshToken(refreshToken: string): Promise<JwtPayload> {
        const decodedToken: JwtPayload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.refreshTokenKey,
        })
        return decodedToken || null;
    }


    async validateAccessToken(accessToken: string): Promise<JwtPayload> {
        const decodedToken: JwtPayload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.accessTokenKey,
        })
        return decodedToken || null;
    }
}





@Injectable()
export class AuthService {
    private readonly userService: UserService;
    private readonly cryptoProvider: CryptoProvider
    private readonly jwtProvider: JwtTokenProvider;

    constructor(
        userService: UserService,
        cryptoProvider: CryptoProvider,
        jwtTokenProvider: JwtTokenProvider,
    ) {
        this.userService = userService;
        this.jwtProvider = jwtTokenProvider;
        this.cryptoProvider = cryptoProvider;
    }

    public async signIn(authCredentials: AuthCredentials): Promise<JwtToken> {
        const targetUser: UserEntity = await this.userService.findUserByEmail(authCredentials.email);
        if (!targetUser) {
            throw new NotFoundException('invalid email');
        } 

        const isValidPassword: boolean = await this.cryptoProvider.compareHash(authCredentials.password, targetUser.password)
        if (!isValidPassword) {
            throw new UnauthorizedException('invalid password');
        }

        const payload: JwtPayload = {
            email: targetUser.email,
            id: targetUser.id
        }
        
        const tokens: JwtToken = await this.jwtProvider.generateTokens(payload)
        return tokens;
    }



    public async updateAuth(refreshToken: string) {
        const decodedRefreshToken: JwtPayload = await this.jwtProvider.validateRefreshToken(refreshToken);
        if (!decodedRefreshToken) {
            //user must to do SignIn (redirection to login page)
            throw new ForbiddenException('invalid refresh token');
        }
        const payload: JwtPayload = {
            id: decodedRefreshToken.id,
            email: decodedRefreshToken.email,
        }

        const updatedTokens: JwtToken = await this.jwtProvider.generateTokens(payload);
        return updatedTokens;
    }
}




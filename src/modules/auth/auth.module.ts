import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService, JwtTokenProvider } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CryptoModule } from "../crypto/crypto.module";



@Module({
    imports: [
        UserModule,
        CryptoModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('jwt').secret,
                    signOptions: {
                        algorithm: "HS512",
                        // expiresIn: "60",
                    },
                    global: true,
                }
            },
        }),
    ],
    exports: [],
    providers: [AuthService, JwtTokenProvider],
    controllers: [AuthController],
})
export class AuthModule {}
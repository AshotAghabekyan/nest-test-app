import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PostgreUserRepository } from "./repository/user.postgreRepository";
import { USER_REPOSITORY_TOKEN } from "./repository/user.repository";
import { CryptoModule } from "../crypto/crypto.module";
import { CryptoProvider } from "../crypto/crypto.provider";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        CryptoModule,
        JwtModule
    ],
    exports: [UserService],
    controllers: [UserController],
    providers: [
        UserService,
        CryptoProvider,
        {
            provide: USER_REPOSITORY_TOKEN,
            useClass: PostgreUserRepository,
        }
    ],
})
export class UserModule {};
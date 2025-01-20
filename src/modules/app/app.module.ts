import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import envConfig from "../../config/env"
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const dbEnv: Record<string, string> = configService.get('db');
        return {
          dialect: "postgres",
          port: +dbEnv.port,
          host: dbEnv.host,
          database: dbEnv.database,
          password: dbEnv.password,
          username: dbEnv.username,
          autoLoadModels: true,
        }
      }
    }),

    UserModule,
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

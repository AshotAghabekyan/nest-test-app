import { Module } from '@nestjs/common';
import { CryptoProvider } from './crypto.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [CryptoProvider],
    exports: [CryptoProvider],
})
export class CryptoModule {}

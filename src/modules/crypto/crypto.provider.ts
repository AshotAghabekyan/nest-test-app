import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ICryptoProvider } from './interface/crypto.interface';




@Injectable()
export class CryptoProvider implements ICryptoProvider {
    private readonly encryptionKey: string;
    private readonly saltRounds = 10;
    private readonly iv: string = crypto.randomBytes(16).toString("hex");

    constructor(configService: ConfigService) {
        this.encryptionKey = configService.get('cryptography').secret;
    }

    async hash(data: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(this.saltRounds);
        const hash: string = await bcrypt.hash(data, salt);
        return hash;
    }

    async compareHash(data: string, hash: string): Promise<boolean> {
        const isMatched: boolean = await bcrypt.compare(data, hash);
        return isMatched;
    }

    encrypt(data: string): string {
        const cipher = crypto.createCipheriv("aes-256-cbc", this.encryptionKey, this.iv)
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(data: string): string {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, this.iv);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

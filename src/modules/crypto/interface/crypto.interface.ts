



export interface ICryptoProvider {
    hash(data: string): Promise<string>;
    compareHash(data: string, hash: string): Promise<boolean>;
    encrypt(data: string): string;
    decrypt(data: string): string;
  }
  
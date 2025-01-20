

export class ProductRepositoryException extends Error {
    constructor(message: string) {
        super(`Product Repository Exception: ${message}`);
        this.name = 'ProductRepositoryError';
    }
}



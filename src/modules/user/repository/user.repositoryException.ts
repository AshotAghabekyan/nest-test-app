

export class UserRepositoryException extends Error {
    constructor(message: string) {
        super(`User Repository Exception: ${message}`);
        this.name = 'UserRepositoryError';
    }
}



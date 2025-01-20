

export default () => {
    return {
        port: +process.env.PORT,
        db: {
            dialect: process.env.DB_DIALECT,
            port: +process.env.DB_PORT,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USER,
            database: process.env.DATABASE_NAME,
        },
        jwt: {
            accessTokenKey: process.env.JWT_ACCESS_SECRET,
            refreshTokenKey: process.env.JWT_REFRESH_SECRET
        },

        cryptography: {
            secret: process.env.ENCRYPTION_SECRET_KEY,
        }
    }
}


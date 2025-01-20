

export interface AuthCredentials {
    email: string;
    password: string;
}


export interface JwtPayload {
    id: number,
    email: string,
}


export interface JwtToken {
    accessToken: string,
    refreshToken: string
}


export interface AccessToken {
    token: string
}



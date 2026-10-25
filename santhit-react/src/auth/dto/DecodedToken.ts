export interface DecodedToken{
    sub: string;
    roles: string[];
    exp: number;
    type: string;
}
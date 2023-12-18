
export interface IJwtService {
    generateToken(data: any): string;
    verifyToken(token: string): any;
}
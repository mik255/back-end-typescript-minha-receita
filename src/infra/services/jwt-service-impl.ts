import { IJwtService } from "../../domain/services/jwt-service";
const jwt = require('jsonwebtoken');
require('dotenv').config();


const secretKey = process.env.JWT_SECRET;
const algorithm = 'HS256';

export class JwtService implements IJwtService {

    generateToken(userId: string): string {
        const payload = {
            userId: userId,
        };
        const token = jwt.sign(payload, secretKey, { algorithm });
        return token;
    }
    verifyToken(token: string) {
        const decoded = jwt.verify(token, secretKey, { algorithms: [algorithm] });
        return decoded;
    }

}
const jwt = require('jsonwebtoken');
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.SECRET_KEY;
const algorithm = 'HS256';

export function generateJWTToken(userId: string) {
    const payload = {
        userId: userId,
    };
    const token = jwt.sign(payload, secretKey, { algorithm });
    return token;
}
interface AuthenticatedRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    console.log(req.path);
    if (req.path == '/account/login' || req.path == '/account/register') {
        next();
        return;
    }
    var token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: 'Token de autenticação ausente.' });
        return
    }
    token = token.split(' ')[1];

    jwt.verify(token, secretKey, { algorithms: [algorithm] }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Falha na autenticação. Token inválido.' });
        }
        // Inicializa req.body como um objeto se for undefined
        req.body = req.body || {};

        // Adiciona propriedades ao req.body
        req.userId = decoded.userId;
        // Continue com a execução normal da rota
        console.log(req.body);
        next();
    });
}

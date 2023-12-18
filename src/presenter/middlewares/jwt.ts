const jwt = require('jsonwebtoken');
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infra/services/jwt-service-impl';
import { IJwtService } from '../../domain/services/jwt-service';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const jwtMiddlewareService:IJwtService = new JwtService();

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    console.log(req.path);
    if (req.path == '/account/login' || req.path == '/account/register' || req.path.search('/uploads') != -1) {
        next();
        return;
    }
    var token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: 'Token de autenticação ausente.' });
        return
    }
    token = token.split(' ')[1];

    const decoded = jwtMiddlewareService.verifyToken(token);
    if (!decoded) {
        res.status(401).json({ message: 'Token de autenticação inválido.' });
        return
    }
    // Inicializa req.body como um objeto se for undefined
    req.body = req.body || {};

    // Adiciona propriedades ao req.body
    req.userId = decoded.userId;
    // Continue com a execução normal da rota
    console.log(req.body);
    next();
}

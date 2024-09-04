import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {tokenKey} from '../config/key'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized Token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, tokenKey);
        (req as any).user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Token' });
    }
};

export default verifyToken;
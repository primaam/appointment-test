import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { tokenKey } from '../config/key';

const login = async (req: Request, res: Response) =>{
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        
        
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Wrong username or password' });
        }

        const token = jwt.sign(
            { userId: user.user_id, username: user.username, role: user.role },
            tokenKey, 
            { expiresIn: '1h' } 
        );

        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

export {login}
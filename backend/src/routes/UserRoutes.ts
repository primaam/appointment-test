import { Router } from 'express';
import { login } from '../controllers/UserController';

const authRouter = Router()

authRouter.post('/login', login)

export {authRouter}
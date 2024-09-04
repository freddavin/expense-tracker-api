import { Router } from 'express';
import { signup, login } from '../controllers/auth';
import { errorHandler } from '../libs/core';

export const authRoutes = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));

import express from 'express';
import { authRoutes, expensesRoutes } from './routes';
import { errorMiddleware } from './middlewares';
import './libs/prisma';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/expenses', expensesRoutes);
app.use(errorMiddleware);

export default app;

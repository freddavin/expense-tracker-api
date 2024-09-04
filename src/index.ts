import express from 'express';
import { authRoutes, expensesRoutes } from './routes';
import { errorMiddleware } from './middlewares';
import dotenv from 'dotenv';
import './libs/prisma';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/expenses', expensesRoutes);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

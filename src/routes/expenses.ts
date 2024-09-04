import { Router } from 'express';
import { createExpense } from '../controllers/expenses';
import { authMiddleware } from '../middlewares';

export const expensesRoutes = Router();

expensesRoutes.post('/', authMiddleware, createExpense);

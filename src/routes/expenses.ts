import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  listExpenses,
} from '../controllers/expenses';
import { authMiddleware } from '../middlewares';
import { errorHandler } from '../libs/core';

export const expensesRoutes = Router();

expensesRoutes.post('/', authMiddleware, errorHandler(createExpense));
expensesRoutes.delete('/:id', authMiddleware, errorHandler(deleteExpense));
expensesRoutes.get('/', authMiddleware, errorHandler(listExpenses));

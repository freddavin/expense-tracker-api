import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  listExpenses,
  updateExpense,
} from '../controllers/expenses';
import { authMiddleware } from '../middlewares';
import { errorHandler } from '../libs/core';

export const expensesRoutes = Router();

expensesRoutes.post('/', authMiddleware, errorHandler(createExpense));
expensesRoutes.get('/', authMiddleware, errorHandler(listExpenses));
expensesRoutes.delete('/:id', authMiddleware, errorHandler(deleteExpense));
expensesRoutes.put('/:id', authMiddleware, errorHandler(updateExpense));

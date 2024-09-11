import request from 'supertest';
import app from '../../src/server';
import { prismaMock } from '../mocks/prisma';
import { hashSync } from 'bcrypt';
import { Expense } from '@prisma/client';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OGM3OTVhYS03ZGZkLTRlMTMtYWE2Mi1lZDFlOTI5MzRkM2IiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3MjYwMTE2MTEsImV4cCI6NTUyNjAxMTkxMX0.ChIjbrSckRDroA8hg3nTiON7MHZgMQxcemUVwmaC7Nk';

describe('expenses endpoint', () => {
  describe('post expenses route', () => {
    it('given expense was created. should return a 201', async () => {
      const expense = {
        description: 'description',
        category: 'food',
        amount: 5.99,
        date: '2024-08-01T10:54:23.587Z',
      };

      prismaMock.user.findFirst.mockResolvedValue({
        id: '48c795aa-7dfd-4e13-aa62-ed1e92934d3b',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: hashSync('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      prismaMock.expense.create.mockResolvedValue({
        id: '48c795aa-7dfd-4e13-aa62-ed1e92934d3b',
      } as Expense);

      const res = await request(app)
        .post('/expenses')
        .send(expense)
        .set({ authorization: token });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('given that headers are without token. should return a 401', async () => {
      const expense = {
        description: 'description',
        category: 'food',
        amount: 5.99,
        date: '2024-08-01T10:54:23.587Z',
      };

      const res = await request(app).post('/expenses').send(expense);

      expect(res.statusCode).toEqual(401);
    });

    it('given that token is invalid. should return a 401', async () => {
      const expense = {
        description: 'description',
        category: 'food',
        amount: 5.99,
        date: '2024-08-01T10:54:23.587Z',
      };

      const res = await request(app)
        .post('/expenses')
        .send(expense)
        .set({ authorization: '123' });

      expect(res.statusCode).toEqual(401);
    });

    it('given user is not found. should return a 404', async () => {
      const expense = {
        description: 'description',
        category: 'food',
        amount: 5.99,
        date: '2024-08-01T10:54:23.587Z',
      };

      prismaMock.user.findFirst.mockResolvedValue(null);

      const res = await request(app)
        .post('/expenses')
        .send(expense)
        .set({ authorization: token });

      expect(res.statusCode).toEqual(404);
    });
  });
});

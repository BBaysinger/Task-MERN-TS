import request from 'supertest';

import app from './app.test';

// Mock User model functions
jest.mock('../models/userModel', () => {
  // Mock User model
  const mockUser = {
    _id: 'user-id',
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockUser),
  };
});

// Mock JWT and bcrypt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
}));

const bcrypt = require('bcryptjs');
bcrypt.genSalt = jest.fn().mockResolvedValue('mock-salt');
bcrypt.hash = jest.fn().mockResolvedValue('mock-hashed-password');

// Test cases
describe('User Registration API', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register') // Adjust to your registration route
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'John Doe');
    expect(response.body).toHaveProperty('email', 'johndoe@example.com');
  });

  test('should return a 400 error if any field is missing', async () => {
    const response = await request(app)
      .post('/api/users/register') // Adjust to your registration route
      .send({
        name: 'John Doe',
        email: '', // Missing email field intentionally
        password: 'password',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are mandatory');
  });
});
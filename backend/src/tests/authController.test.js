import { signUp, signIn } from '../controllers/authController.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


jest.mock('../models/user.js');
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true)
}));
jest.mock('jsonwebtoken');


beforeAll(() => {
ts
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
 
  console.log.mockRestore();
});

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {

    req = {
      body: {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create a new user successfully', async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        fullName: 'Test User',
        email: 'test@example.com'
      };

      User.create.mockResolvedValue(mockUser);

      await signUp(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        data: mockUser,
        status: 201,
        result: 1,
        total: 1
      });
    });

    it('should handle errors during user creation', async () => {
      const error = new Error('Database error');
      User.create.mockRejectedValue(error);

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create user',
        status: 500
      });
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully with correct credentials', async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        _doc: {
          _id: new mongoose.Types.ObjectId(),
          fullName: 'Test User',
          email: 'test@example.com'
        }
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake_token');

      await signIn(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id },
        process.env.JWT_SECRET_KEY
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        data: {
          token: 'fake_token',
          ...mockUser._doc
        },
        status: 200,
        result: 1,
        total: 1
      });
    });

    it('should handle non-existent user', async () => {
      User.findOne.mockResolvedValue(null);

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'User not found',
        status: 404
      });
    });

    it('should handle incorrect password', async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'hashedPassword'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid credentials',
        status: 400
      });
    });

    it('should handle server errors during sign in', async () => {
      const error = new Error('Database error');
      User.findOne.mockRejectedValue(error);

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Server error',
        status: 500
      });
    });
  });
}); 
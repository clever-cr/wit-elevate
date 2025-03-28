// import jwt from 'jsonwebtoken';
// import { verifyUserToken } from '../middleware/verifyToken.js';
// import User from '../models/user.js';

// jest.mock('jsonwebtoken');
// jest.mock('../models/user.js'); // Mock the User model

// describe('Verify User Token Middleware', () => {
//   let req;
//   let res;
//   let next;

//   beforeEach(() => {
//     req = { headers: { authorization: 'Bearer fake_token' }, body: {} };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   it('should verify token and proceed if valid', async () => {
//     jwt.verify.mockReturnValue({ id: 'user_id' });
//     User.findById.mockResolvedValue({ _id: 'user_id', name: 'John Doe' });

//     await verifyUserToken(req, res, next);

//     expect(req.user).toEqual({ _id: 'user_id', name: 'John Doe' });
//     expect(req.token).toBe('fake_token'); // Extracted token
//     expect(req.body.createdBy).toBe('user_id');
//     expect(next).toHaveBeenCalled();
//   });

//   it('should return 404 for token not found', async () => {
//     req.headers.authorization = ''; // No token

//     await verifyUserToken(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'token not found' });
//   });

//   it('should return 404 if user is not found', async () => {
//     jwt.verify.mockReturnValue({ id: 'user_id' });
//     User.findById.mockResolvedValue(null); // User not found

//     await verifyUserToken(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
//   });

//   it('should return 401 for expired token', async () => {
//     jwt.verify.mockImplementation(() => {
//       throw new Error('jwt expired');
//     });

//     await verifyUserToken(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({ message: 'token expired' });
//   });

//   it('should return 400 for failed token verification', async () => {
//     jwt.verify.mockImplementation(() => {
//       throw new Error('Invalid Token');
//     });

//     await verifyUserToken(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ message: 'failed to verify token' });
//   });
// });

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';
import User from '../models/user.js';
import verifyToken from '../middleware/verifyUserToken.js';

describe('Verify Token Middleware', () => {
  let mockRequest, mockResponse, next;

  beforeEach(() => {
    mockRequest = {
      header: jest.fn().mockReturnValue('Bearer validToken'),
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', async () => {
    mockRequest.header.mockReturnValue(null);

    await verifyToken(mockRequest, mockResponse, next);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Access Denied' });
  });

  it('should return 403 for invalid token', async () => {
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await verifyToken(mockRequest, mockResponse, next);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });

  it('should return 404 if user not found', async () => {
    const decodedToken = { id: new mongoose.Types.ObjectId() };

    jwt.verify = jest.fn().mockReturnValue(decodedToken);
    User.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await verifyToken(mockRequest, mockResponse, next);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should call next if user is found', async () => {
    const decodedToken = { id: new mongoose.Types.ObjectId() };
    const mockUser = { _id: decodedToken.id, name: 'Debbie' };

    jwt.verify = jest.fn().mockReturnValue(decodedToken);
    User.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await verifyToken(mockRequest, mockResponse, next);

    expect(next).toHaveBeenCalled();
    expect(mockRequest.user).toEqual(mockUser);
  });
});

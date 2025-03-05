import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404).json({
        message: "token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user = user;
    req.token = token;
    req.body.createdBy = user._id;
    next();
  } catch (error) {
    console.log("error", error);
    if (error.message === "jwt expired") {
      return res.status(401).json({
        message: "token expired"
      });
    }
    return res.status(400).json({
      message: "failed to verify token",
    });
  }
}; 
import { Request, Response } from "express";
import { decodeToken } from "../utils/token";
import User from "../models/user";
export const verifyUserToken = async (
  req: any,
  res: Response,
  next: () => any
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404).json({
        message: "token not found",
      });
    }
    const payload: any = decodeToken(token);
    const { name } = payload;
    if (name === "JsonWebTokenError") {
      console.log("token error");
    } else if (name === "TokenExpiredError") {
      console.log("token expired error");
    }

    const user = await User.findOne({ _id: payload?.id }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user = user;
    req.token = token;
    req.body.createdBy = user._id;
    return next();
  } catch (error: any) {
    console.log("error", error);
    if (error?.message === "jwt expired") {
      console.log("token is expired");
    }
    return res.status(400).json({
      message: "failed to verify token",
    });
  }
};

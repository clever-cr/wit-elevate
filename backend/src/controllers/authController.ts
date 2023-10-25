import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    const harshedPassword = await bcrypt.hash(password, 10);

    if (userExists) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password: harshedPassword,
    });

    const returnedUser = {
      id: user.id,
      fullName: user.fullName,
      emaiil: user.email,
    };

    return res.status(200).json({
      message: "User created successfully",
      user: returnedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(403).json({
        message: "Invalid email",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid password",
      });
    }

    const returnedUser = {
      id: userExists.id,
      fullName: userExists.fullName,
      email: userExists.email,
    };

    const token = jwt.sign(returnedUser, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: returnedUser,
      token,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const editRole = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(404).send("user doesn't exists");
    }
    res.status(200).send(`Role changed to ${user}`);
  } catch (error) {
    console.log(error);
  }
};
export { signUp, signIn, editRole };

import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

export { signUp };

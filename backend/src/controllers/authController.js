const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
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
      role,
      password: harshedPassword,
    });

    const returnedUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: "User created successfully",
      user: returnedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const signIn = async (req, res) => {
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
      role: userExists.role,
    };

    const token = jwt.sign(returnedUser, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: returnedUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { signUp, signIn }; 
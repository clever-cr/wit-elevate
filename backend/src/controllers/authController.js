import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import status from "http-status"
import Response from '../utils/Response.js';
import mongoose from 'mongoose';

export const signUp = async (req, res) => {
  try {
    const { fullName, firstName,lastName,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return Response.succesMessage(
      res,
      "User created successfully",
      user,
      status.CREATED
    );
  } catch (error) {
  console.log("error",error)
    return Response.errorMessage(
      res,
      "Failed to create user",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return Response.errorMessage(
        res,
        "User not found",
        status.NOT_FOUND
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.errorMessage(
        res,
        "Invalid credentials",
        status.BAD_REQUEST
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    return Response.succesMessage(
      res,
      "Login successful",
      { token,...user._doc },
      status.OK
    );
  } catch (error) {

    return Response.errorMessage(
      res,
      "Server error",
      status.INTERNAL_SERVER_ERROR
    );
  }
}; 

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort('-createdAt');
    
    res.status(200).json(users);
  } catch (error) {

    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {userId} = req.params; 
    const user = await User.findById(userId)
    if (!userId) {
      return Response.errorMessage(
        res,
        "Invalid user ID",
        status.BAD_REQUEST
      );
    }
    const allowedFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "educationType",
      "educationCombination",
      "programmingSkills",
      "careerAspirations",
      "hasProgrammingExperience",
      "developmentInterest",
      "priorLearningAttempts",
      "excitingTechnology",
    ];
    const updateData = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return Response.errorMessage(
        res,
        "No valid fields provided for update",
        status.BAD_REQUEST
      );
    }
    const updatedUser = await User.findByIdAndUpdate(
     userId,
      { $set: updateData }, 
      { new: true, runValidators: true } 
    );
    if (!updatedUser) {
      return Response.errorMessage(res, "User not found", status.NOT_FOUND);
    }
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    return Response.succesMessage(
      res,
      "Profile updated successfully",
      userResponse,
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to update user profile",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

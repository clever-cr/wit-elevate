import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import status from "http-status"
import Response from '../utils/Response.js';
import mongoose from 'mongoose';

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
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
    console.log(error);
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    console.log("token",{ token,...user })
    return Response.succesMessage(
      res,
      "Login successful",
      { token,...user._doc },
      status.OK
    );
  } catch (error) {
    console.log(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const {userId} = req.params // From auth middleware
//     console.log("user id****",userId)
//     const {
//       // Personal Info
//       firstName,
//       lastName,
//       phoneNumber,
      
//       // Educational Background
//       educationType,
//       rebCombination,
      
//       // Programming Skills
//       programmingSkills,
      
//       // Career Goals
//       careerGoals
//     } = req.body;

//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update personal information
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
    
//     if (educationType) user.educationType = educationType;
//     if (rebCombination) user.rebCombination = rebCombination;

//     // Update programming skills
//     if (programmingSkills) {
//       user.programmingSkills = {
//         ...user.programmingSkills,
//         ...programmingSkills
//       };
//     }

//     // Update career goals
//     if (careerGoals) {
//       user.careerGoals = {
//         ...user.careerGoals,
//         ...careerGoals
//       };
//     }
//     const updatedUser = await user.save();

//     // Remove password from response
//     const userResponse = updatedUser.toObject();
//     delete userResponse.password;

//     // res.status(200).json({
//     //   message: "Profile updated successfully",
//     //   user: userResponse
//     // });
//     return Response.succesMessage(
//       res,
//       "Profile updated successfully",
//       userResponse,
//       status.OK

//     )
//   } catch (error) {
//     console.error(error);
//     if (error.name === 'ValidationError') {
//         return Response.errorMessage(
//           res,
//           "Validation Error",
//           status.BAD_REQUEST

//         )
     
//     }
//     return Response.errorMessage(
//       res,
//       "Failed to update user profile",
//       status.BAD_REQUEST
//     )
    
//   }
// };






export const updateProfile = async (req, res) => {
  try {
    const {userId} = req.params; // Ensure userId is available from auth middleware
    const user = await User.findById(userId)
    console.log("userrr ",user)
    if (!userId) {
      return Response.errorMessage(
        res,
        "Invalid user ID",
        status.BAD_REQUEST
      );
    }

    console.log("Updating user with ID:", userId);

    // Extract only valid fields from req.body
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

    // Filter out undefined fields to avoid overwriting with null
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

    
    console.log("userId",new mongoose.Types.ObjectId(userId))
    const updatedUser = await User.findByIdAndUpdate(
     userId,
      { $set: updateData }, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return Response.errorMessage(res, "User not found", status.NOT_FOUND);
    }

    // Remove sensitive fields before sending response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    console.log("Updated user:", userResponse);

    return Response.succesMessage(
      res,
      "Profile updated successfully",
      userResponse,
      status.OK
    );
  } catch (error) {
    console.error("Error updating profile:", error);
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

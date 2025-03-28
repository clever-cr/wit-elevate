import User from '../models/user.js';


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
    const userId = req.user._id; 
    const {
     
      firstName,
      lastName,
      phoneNumber,
      educationType,
      rebCombination,
      programmingSkills,
      
      careerGoals
    } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;


    if (educationType) user.educationType = educationType;
    if (rebCombination) user.rebCombination = rebCombination;


    if (programmingSkills) {
      user.programmingSkills = {
        ...user.programmingSkills,
        ...programmingSkills
      };
    }


    if (careerGoals) {
      user.careerGoals = {
        ...user.careerGoals,
        ...careerGoals
      };
    }

    const updatedUser = await user.save();


    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Profile updated successfully",
      user: userResponse
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Server error" });
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
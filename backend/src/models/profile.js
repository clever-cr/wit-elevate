const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  personalInfo: {
    phoneNumber: String,
    programmingExperience: Boolean,
    programmingLanguages: [String],
    educationLevel: String
  },
  interests: {
    developmentInterests: String,
    careerGoals: String
  },
  progress: {
    completedCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],
    assessmentScores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment"
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile; 
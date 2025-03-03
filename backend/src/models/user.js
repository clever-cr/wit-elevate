import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
    },

    // Educational Background
    educationType: {
      type: String,
      default:""
      // enum: ['REB Curriculum', 'TVET Curriculum', 'Other'],
      // required: true,
    },
    educationCombination: {
      type: String,
      default:""
      // Only required if educationType is REB Curriculum
    },

    hasProgrammingExperience: { type: Boolean },
    developmentInterest: {
      type: String,
    },
    careerAspirations: {
      type: String,
    },

    priorLearningAttempts:{
      type:String
    },
    excitingTechnology:{
      type:String
    },


    // Programming Skills Assessment
    programmingSkills: [String],
    // programmingSkills: {
    //   hasSkills: {
    //     type: Boolean,
    //     default: false
    //   },
    //   languages: [String], // Array of programming languages
    //   experienceLevel: {
    //     type: String,
    //     // enum: ['beginner', 'intermediate', 'advanced']
    //   }
    // },

    // Career Goals and Interests
    careerGoals: {
      // Common fields for both paths
      developmentInterest: {
        type: String,
        enum: [
          "Frontend Development",
          "Backend Development",
          "Full Stack Development",
          "Mobile Development",
          "UI/UX Design",
          "DevOps",
          "Other",
        ],
        // required: true,
      },
      careerAspirations: {
        type: String,
        // required: true,
      },

      // For users WITH programming experience
      softwareInterests: {
        type: String,
        // What interests you about software development?
      },
      previousExperience: {
        type: String,
        // Have you ever tried learning any programming concepts before?
      },
      preferredTechnology: {
        type: String,
        // What kind of software or technology excites you the most?
      },

      // For users WITHOUT programming experience
      reasonForInterest: {
        type: String,
        // Why are you interested in learning programming?
      },
      learningStyle: {
        type: String,
        enum: [
          "Visual",
          "Hands-on",
          "Reading",
          "Video Tutorials",
          "Interactive",
          "Mixed",
        ],
      },
      timeCommitment: {
        type: String,
        enum: ["Full-time", "Part-time", "Weekends only", "Few hours per day"],
      },
      preferredLearningPath: {
        type: String,
        enum: [
          "Structured Course",
          "Self-paced",
          "Mentorship",
          "Project-based",
        ],
      },
    },

    role: {
      type: String,
      default: "student",
      // enum: ['student', 'mentor', 'admin']
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;

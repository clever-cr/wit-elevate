import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {

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

    programmingSkills: [String],
    
   

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

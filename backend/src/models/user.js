import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {

    firstName: {
      type: String,
     
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
      
     
    },
    password: {
      type: String,
 
    },
    phoneNumber: {
      type: String,
   
    },


    educationType: {
      type: String,
      default:""
      
    },
    educationCombination: {
      type: String,
      default:""
     
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

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  status: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;

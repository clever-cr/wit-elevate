import mongoose from "mongoose";
import User from "./user";
import Comment from "./comments";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
BlogSchema.pre("find", function (next) {
  this.populate({
    path: "createdBy",
    select: "fullName",
    model: User,
  });

  next();
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;

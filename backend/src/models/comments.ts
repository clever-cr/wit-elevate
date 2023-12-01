import mongoose from "mongoose";
import User from "./user";
import Blog from "./blog";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  blogId: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
  },
});

CommentSchema.pre("find", function (next) {
  this.populate({
    path: "createdBy",
    select: "fullName",
    model: User,
  });
  next();
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;

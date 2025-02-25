const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
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
module.exports = Comment; 
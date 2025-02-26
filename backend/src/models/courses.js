import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  difficulty: String,
  duration: String,
  prerequisites: [String],
  syllabus: [{
    title: String,
    content: String,
    resources: [String]
  }],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    rating: Number,
    review: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model("Course", CourseSchema);
export default Course
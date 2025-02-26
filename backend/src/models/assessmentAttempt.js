import mongoose from "mongoose";

const AssessmentAttemptSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
    required: true,
  },
  answers: [
    {
      question: String,
      selectedAnswer: String,
      isCorrect: Boolean,
      points: Number,
    },
  ],
  score: Number,
  passed: Boolean,
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const AssessmentAttempt = mongoose.model(
  "AssessmentAttempt",
  AssessmentAttemptSchema
);
export { AssessmentAttempt };

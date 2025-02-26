import mongoose from 'mongoose';


const AssessmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    points: Number
  }],
  duration: Number,
  totalQuestions: Number,
  passingScore: Number,
  skillLevel: String,
  category: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);
export default Assessment
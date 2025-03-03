import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true,
      validate: [arr => arr.length >= 2, 'At least 2 options are required']
    },
    correctAnswer: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 1
    }
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  passingScore: {
    type: Number,
    required: true
  },
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'general'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  }
}, {
  timestamps: true
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);
export default Assessment;
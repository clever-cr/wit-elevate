import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssessmentAttemptSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  answers: [{
    question: {
      type: String,
      required: true
    },
    selectedAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    points: {
      type: Number,
      required: true
    }
  }],
  score: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  }
}, {
  timestamps: true
});

const AssessmentAttempt = mongoose.model('AssessmentAttempt', AssessmentAttemptSchema);
export default AssessmentAttempt; 
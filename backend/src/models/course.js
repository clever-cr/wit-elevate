import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  careerPath: {
    type: String,
    // required: true,
    enum: ['frontend', 'backend', 'fullstack', 'ui/ux', 'devops']
  },
  courses: [{
    title: {
      type: String,
      // required: true
    },
    link: {
      type: String,
      // required: true
    },
    platform: {
      type: String,
      // required: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      // required: true
    },
    duration: {
      type: String, // e.g., "6 weeks", "3 months"
      // required: true
    },
    description: String,
    tags: [String]
  }],
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  learningPreference: {
    type: String,
    enum: ['self-paced', 'structured', 'mentor-guided', 'project-based'],
    default: 'self-paced'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', CourseSchema);
export default Course; 
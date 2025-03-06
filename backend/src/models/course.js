import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 
  },
  careerPath: {
    type: String,

    enum: ['frontend', 'backend', 'fullstack', 'ui/ux', 'devops']
  },
  courses: [{
    title: {
      type: String,

    },
    link: {
      type: String,

    },
    platform: {
      type: String,
      
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
     
    },
    duration: {
      type: String, 
   
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
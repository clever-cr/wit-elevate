import mongoose from 'mongoose';
const { Schema } = mongoose;

const ForumPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'frontend', 'backend', 'career', 'projects', 'help']
  },
  // If parentId exists, it's a reply. If null, it's a main thread
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost',
    default: null
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);
export default ForumPost; 
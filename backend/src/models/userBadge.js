import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserBadgeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  assessments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssessmentAttempt'
  }]
}, {
  timestamps: true
});


UserBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

const UserBadge = mongoose.model('UserBadge', UserBadgeSchema);
export default UserBadge; 
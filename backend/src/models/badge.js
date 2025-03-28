import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BadgeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


BadgeSchema.index({ name: 1, user: 1 }, { unique: true });

const Badge = mongoose.model('Badge', BadgeSchema);
export default Badge; 
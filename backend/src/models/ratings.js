import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ratedItem: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'itemType',
    required: true
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Course', 'Mentor']
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.model("Rating", RatingSchema);
export default Rating 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  resume: String,
  coverLetter: String,
  skills: [String],
  experience: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application; 
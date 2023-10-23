import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  organiser: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;

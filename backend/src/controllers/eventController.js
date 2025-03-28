import Event from '../models/event.js';

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({
      message: "Event successfully created",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const allEvents = async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const events = await Event.find()
      .limit(parseInt(limit))
      .populate('author', 'fullName');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const oneEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).populate('author', 'fullName');
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}; 
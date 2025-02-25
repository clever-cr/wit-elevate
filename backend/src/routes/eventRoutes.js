const express = require('express');
const {
  allEvents,
  createEvent,
  deleteEvent,
  oneEvent,
  updateEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.post("/postEvent", createEvent);
router.get("/allEvents", allEvents);
router.get("/event/:id", oneEvent);
router.delete("/deleteEvent/:id", deleteEvent);
router.patch("/updateEvent/:id", updateEvent);

module.exports = router; 
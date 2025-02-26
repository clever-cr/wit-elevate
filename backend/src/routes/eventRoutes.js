import express from 'express';
import {
  allEvents,
  createEvent,
  deleteEvent,
  oneEvent,
  updateEvent,
} from '../controllers/eventController.js';
import { verifyUserToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/postEvent", verifyUserToken, createEvent);
router.get("/allEvents", allEvents);
router.get("/event/:id", oneEvent);
router.delete("/deleteEvent/:id", verifyUserToken, deleteEvent);
router.patch("/updateEvent/:id", verifyUserToken, updateEvent);

export default router; 
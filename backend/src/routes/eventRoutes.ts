import express from "express";
import {
  allEvents,
  createEvent,
  deleteEvent,
  oneEvent,
} from "../controllers/eventController";

const eventRouter = express.Router();
eventRouter.post("/postEvent", createEvent);
eventRouter.get("/allEvents", allEvents);
eventRouter.get("/event/:id", oneEvent);
eventRouter.delete("/deleteEvent/:id", deleteEvent);
export default eventRouter;

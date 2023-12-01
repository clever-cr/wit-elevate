import express from "express";
import {
  allEvents,
  createEvent,
  deleteEvent,
  oneEvent,
  updateEvent,
} from "../controllers/eventController";

const eventRoute = express.Router();
eventRoute.post("/postEvent", createEvent);
eventRoute.get("/allEvents", allEvents);
eventRoute.get("/event/:id", oneEvent);
eventRoute.delete("/deleteEvent/:id", deleteEvent);
eventRoute.patch("/updateEvent/:id", updateEvent);
export default eventRoute;

import { resourceLimits } from "worker_threads";
import Event from "../models/event";
import { Request, Response } from "express";

const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).send(`event successfully created${event}`);
  } catch (error) {
    console.log(error);
  }
};

const allEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
  }
};

const oneEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    res.status(200).send(event);
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      res.status(404).send(`event not found`);
    }
    res.send(`event deleted successfully${event}`);
  } catch (error) {
    console.log(error);
  }
};

export { createEvent, allEvents, oneEvent, deleteEvent };

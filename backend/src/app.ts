import express from "express";
import mongoose from "mongoose";
import * as dontenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import authRouters from "./routes/authRoutes";
import eventRouters from "./routes/eventRoutes";
import blogRouter from "./routes/blogRoutes";

const app = express();
dontenv.config();

const database: any = process.env.DB_URL;

mongoose
  .connect(database)
  .then(() => {
    app.listen(3000);
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());
app.use(authRouters);
app.use(eventRouters);
app.use(blogRouter);

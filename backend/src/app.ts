import express from "express";
import mongoose from "mongoose";
import * as dontenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import eventRoute from "./routes/eventRoutes";
import blogRoute from "./routes/blogRoutes";
import commentRoute from "./routes/commentRoutes";

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
app.use(authRoute);
app.use(eventRoute);
app.use(blogRoute);
app.use(commentRoute);

import express from "express";
import mongoose from "mongoose";
import * as dontenv from "dotenv";
import "dotenv/config";

const app = express();
dontenv.config();

const database: any = process.env.db;

mongoose
  .connect(database)
  .then(() => {
    app.listen(3000);
    console.log("connected to daatabase");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());


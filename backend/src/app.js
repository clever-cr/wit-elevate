import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import eventRoute from './routes/eventRoutes.js';
import blogRoute from './routes/blogRoutes.js';
import commentRoute from './routes/commentRoutes.js';
import courseRoute from './routes/courseRoute.js';
import assessmentRoute from "./routes/assessmentsRoutes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const database = process.env.DB_URL;

mongoose
  .connect(database)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

app.use(express.json());
app.use(cors());
app.use('/api', authRoute);
app.use('/api', eventRoute);
app.use('/api', blogRoute);
app.use('/api', commentRoute);
app.use("/api", courseRoute);
app.use('/api', assessmentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
}); 
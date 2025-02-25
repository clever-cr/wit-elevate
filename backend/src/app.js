const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/authRoutes.js');
const eventRoute = require('./routes/eventRoutes.js');
const blogRoute = require('./routes/blogRoutes.js');
const commentRoute = require('./routes/commentRoutes.js');

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
}); 
const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const agentRoutes = require("./routes/agentRoute");
const propertyRoutes = require("./routes/propertyRoute");
const mediaRoutes = require("./routes/mediaRoute");
const model3dRoutes = require("./routes/model3dRoute");
const visitRoutes = require("./routes/visitRoute");
const favoriteRoutes = require("./routes/favoriteRoute");
const appointmentRoutes = require("./routes/appointmentRoute");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/models", model3dRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/favorites", favoriteRoutes); 
app.use("/api/appointments", appointmentRoutes); 

app.use("/uploads", express.static("uploads")); // pour les medias
app.use("/models", express.static("models")); // pour les models 3D

module.exports = app;
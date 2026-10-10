const express = require("express");
const eventRoutes = require("./routes/events");
const registrationRoutes = require("./routes/registrations");
const userRoutes = require("./routes/users");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const cors = require("cors");

const pingRoutes = require("./routes/pingRoutes");
const userRoutes = require("./routes/userRoutes");
const priceRoutes = require("./routes/priceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", pingRoutes);
app.use("/api", userRoutes);
app.use("/api", priceRoutes);

module.exports = app;

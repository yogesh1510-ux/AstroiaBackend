const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://astoria-frontend.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// app.options("/*", cors());

app.use(express.json());

app.use("/api", require("./routes/LeadRoutes"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

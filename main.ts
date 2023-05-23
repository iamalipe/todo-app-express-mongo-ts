import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { authRoute, todoRoute } from "./routes";
import { authenticateUser } from "./middlewares";

const EXPRESS_PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "";

const app = express();
app.use(express.json());

// Connecting to the database
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(`🟢 successfully connected to database`);
  })
  .catch((error) => {
    console.log(`🔴 database connection failed. exiting now...`);
    console.error(error);
    process.exit(1);
  });

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/todo", authenticateUser, todoRoute);

app.listen(EXPRESS_PORT, () => {
  console.log(`🟢 App is running on port ${EXPRESS_PORT}.`);
});

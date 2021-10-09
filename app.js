import "express-async-errors";
import express from "express";

import * as dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./utils/dbConnection.js";
import router from "./routes/index.js";


dotenv.config();
const app = express();

//db connection
dbConnection();

//server middleware
app.use(express.json());
app.use(express.static('public/uploads'))

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);
//test root route
app.get("/", async (req, res) => {
  res.send("helloworld");
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.log("****SERVER_ERROR****");
  console.log(err);
  return res.status(500).json(failure(err.message || "Something went wrong!"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

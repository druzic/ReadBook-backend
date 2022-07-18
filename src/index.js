import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const bookRoutes = require("../routes/bookRoutes.js");
const authRoutes = require("../routes/authRoutes.js");
const issuedRoutes = require("../routes/issuedRoutes.js");

import cors from "cors";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
const port = 3000;

app.use(bookRoutes);
app.use(authRoutes);
app.use(issuedRoutes);

app.listen(port, () => console.log(`Slušam na portu ${port}`));

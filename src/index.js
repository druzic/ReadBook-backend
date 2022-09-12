import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import bookRoutes from "../routes/bookRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import issuedRoutes from "../routes/issuedRoutes.js";
import reservationRoutes from "../routes/reservationRoutes.js";

import cors from "cors";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ extended: false }));
const port = process.env.PORT || 3000;

app.use(bookRoutes);
app.use(authRoutes);
app.use(issuedRoutes);
app.use(reservationRoutes);

app.listen(port, () => console.log(`Slušam na portu ${port}`));

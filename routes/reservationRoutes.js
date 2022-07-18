const express = require("express");
import Reservation from "../models/Reservations";
import Book from "../models/Books";

const reservationRoutes = express.Router();

reservationRoutes.post("/reservation/add", async (req, res) => {
  const { user, book, reservationDate, dueDate } = req.body;
  console.log(req.body);
  try {
    let newReservation = new Reservation({
      user,
      book,
      reservationDate,
      dueDate,
    });
    console.log(user);
    await Book.updateOne(
      { _id: book },
      {
        $inc: { quantity: -1 },
      }
    );
    await newReservation.save();
    //console.log(newReservation);

    return res.status(200).json({ msg: "Done", newReservation });
  } catch (error) {
    res.status(400).json({ msg: "Invalid data", data: req.body });
  }
});

reservationRoutes.get("/reservation", async (req, res) => {
  try {
    let reservation = await Reservation.find({ isReturned: false }).populate([
      "user",
      "book",
    ]);
    res.send(reservation);
    //console.log(issued);
  } catch (error) {
    console.log(error);
  }
});

module.exports = reservationRoutes;
